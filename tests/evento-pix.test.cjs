const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const { transformSync } = require('@babel/core');

function compile(file) {
    return transformSync(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
        configFile: false, babelrc: false,
        plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
    }).code;
}
const screenCode = compile('src/pages/Eventos/EventoDetail.js');
const quoteCode = compile('src/services/eventos/pixQuote.js');
// Exemplo do contrato publicado pelo servidor, sem gerar BR Code no aplicativo.
const serverCode = '00020126440014br.gov.bcb.pix0122financeiro@example.com520400005303986540575.005802BR5905FAZAG6007VALENCA622805240123456789abcdef012345676304B89D';
function quote(now, overrides = {}) {
    return { quoteId: 'reserva123', eventoId: 'evt', inscricaoId: 'inscricao123', amount: '75.00', code: serverCode,
        txid: '0123456789abcdef01234567', createdAt: now, expiresAt: now + 1800000, ...overrides };
}

function setup() {
    const event = { id: 'evt', tipo: 'PAGO', preco: '50.00', chavePix: 'pix@example.com', dataInicio: '2026-11-03', dataFim: '2026-11-05' };
    const api = { event, status: 'PENDENTE', success: true, now: Date.now(), quote: null, calls: [] };
    const clock = { now: api.now };
    class ClockDate extends Date { static now() { return clock.now; } }
    const state = [event, false, false, false, false, null, clock.now, 0, false, null, true, 'inscricao123', 'PENDENTE', [], false, false, null, [], false, []];
    let stateIndex = 0;
    let focus;
    let effect;
    const copies = [];
    const alerts = [];
    const refs = [{ current: 0 }];
    const React = {
        createElement: (type, props, ...children) => ({ type, props, children }),
        useState: () => { const index = stateIndex++; return [state[index], value => { state[index] = value; }]; },
        useMemo: fn => fn(), useCallback: fn => fn, useEffect: fn => { effect = fn; }, useRef: () => refs[0],
    };
    const service = {
        getEventoById: async () => ({ success: true, data: api.event }),
        listMinhasInscricoes: async () => ({ success: true, data: [{ id: 'inscricao123', eventoId: 'evt' }] }),
        getInscricaoDetail: async () => ({ success: true, data: { id: 'inscricao123', status: api.status, evento: api.event } }),
        getPixQuote: async id => {
            api.calls.push(['GET', id]);
            if (!api.success) throw new Error('Servidor indisponível');
            if (api.quote && api.now >= api.quote.expiresAt) api.quote = null;
            return { success: true, data: api.status === 'PENDENTE' ? api.quote : null, serverNow: api.now };
        },
        generatePixQuote: async id => {
            api.calls.push(['POST', id]);
            if (!api.success || api.status !== 'PENDENTE') throw new Error('Geração indisponível');
            if (!api.quote || api.now >= api.quote.expiresAt) api.quote = quote(api.now);
            return { success: true, data: api.quote, serverNow: api.now };
        },
    };
    const quoteContext = { exports: {}, require: name => {
        assert.equal(name, './eventosService'); return { EventosService: service };
    } };
    vm.runInNewContext(quoteCode, quoteContext);
    const mocks = {
        react: React,
        'react-native': { View: 'View', Text: 'Text', ScrollView: 'ScrollView', TouchableOpacity: 'Button', Image: 'Image', ActivityIndicator: 'Spinner', Alert: { alert: (...args) => alerts.push(args) }, AppState: { addEventListener: () => ({ remove() {} }) } },
        '@expo/vector-icons': { Ionicons: 'Icon', Feather: 'Icon' },
        '@react-navigation/native': { useNavigation: () => ({}), useRoute: () => ({ params: { id: 'evt' } }), useIsFocused: () => true, useFocusEffect: fn => { focus = fn; } },
        './style': { styles: {} }, '../../../styles/theme': { colors: { primary: {}, gray: {} } },
        '../../services/eventos/eventosService': { EventosService: service },
        'date-fns': { format: () => '' }, 'date-fns/locale': { ptBR: {} },
        '../../utils/formatEventDate': { formatEventDate: () => '' },
        '../../utils/clipboard': { copyToClipboard: async value => { copies.push(value); return true; } },
        '../../services/eventos/pixQuote': quoteContext.exports,
        'react-native-qrcode-svg': 'QRCode',
    };
    const context = { exports: {}, require: name => { assert.ok(name in mocks, name); return mocks[name]; }, console, Date: ClockDate, setInterval: () => 1, clearInterval() {} };
    vm.runInNewContext(screenCode, context);
    const settle = () => new Promise(setImmediate);
    return { api, copies, alerts, clock, quoteService: quoteContext.exports,
        open: async () => { focus(); await settle(); },
        tick: async () => { effect(); await settle(); },
        render: () => { stateIndex = 0; state[6] = clock.now; return context.exports.EventoDetail(); } };
}

function find(node, predicate) {
    if (!node || typeof node !== 'object') return null;
    if (predicate(node)) return node;
    for (const child of Array.isArray(node) ? node : node.children || []) {
        const result = find(child, predicate);
        if (result) return result;
    }
    return null;
}
const button = (tree, label) => find(tree, node => node.props?.accessibilityLabel === label);
const qr = tree => find(tree, node => node.type === 'QRCode');

test('abrir consulta GET e recupera a mesma reserva gerada em outro aparelho', async () => {
    const app = setup();
    app.api.quote = quote(app.api.now - 600000);
    app.render(); await app.open();
    const tree = app.render();
    assert.equal(qr(tree).props.value, app.api.quote.code);
    assert.ok(button(tree, 'Gerar Pix').props.disabled);
    assert.deepEqual(app.api.calls.map(call => call[0]), ['GET']);
    assert.equal(app.api.quote.expiresAt - app.api.quote.createdAt, 1800000);
});

test('GET sem reserva não gera nada; POST e cópia usam exatamente o código do servidor', async () => {
    const app = setup();
    app.render(); await app.open();
    assert.equal(qr(app.render()), null);
    assert.equal(app.api.calls.filter(call => call[0] === 'POST').length, 0);
    await button(app.render(), 'Gerar Pix').props.onPress();
    const tree = app.render();
    assert.equal(qr(tree).props.value, serverCode);
    assert.ok(find(tree, node => node.props?.selectable && node.children[0] === serverCode));
    assert.equal(app.copies.length, 0);
    assert.ok(require('qrcode').create(serverCode).modules.size > 0);
    await button(tree, 'Copiar código Pix').props.onPress();
    assert.equal(app.copies[0], serverCode);
    assert.deepEqual(app.api.calls.map(call => call[0]), ['GET', 'POST', 'GET']);
});

test('virada de lote mantém reserva e vencimento retornados pelo servidor', async () => {
    const app = setup();
    await button(app.render(), 'Gerar Pix').props.onPress();
    const original = app.api.quote;
    app.api.event = { ...app.api.event, preco: '100.00' };
    app.api.now += 600000; app.clock.now += 600000;
    await button(app.render(), 'Copiar código Pix').props.onPress();
    assert.equal(app.copies[0], original.code);
    assert.equal(app.api.quote.expiresAt, original.expiresAt);
    assert.equal(app.api.quote.amount, '75.00');
    assert.equal(app.api.calls.filter(call => call[0] === 'POST').length, 1);
});

test('contador ao chegar a zero consulta GET; somente ação explícita gera nova reserva', async () => {
    const app = setup();
    await button(app.render(), 'Gerar Pix').props.onPress();
    app.api.now += 1800000; app.clock.now += 1800000;
    app.render(); await app.tick();
    assert.equal(qr(app.render()), null);
    assert.equal(button(app.render(), 'Gerar Pix').props.disabled, false);
    assert.deepEqual(app.api.calls.map(call => call[0]), ['POST', 'GET']);
    app.api.quote = quote(app.api.now, { quoteId: 'novaReserva', amount: '100.00', code: 'codigo-novo-do-servidor' });
    await button(app.render(), 'Gerar Pix').props.onPress();
    assert.equal(qr(app.render()).props.value, app.api.quote.code);
});

test('consulta antes de copiar respeita expiração no servidor e não faz POST', async () => {
    const app = setup();
    await button(app.render(), 'Gerar Pix').props.onPress();
    app.api.now += 1800000;
    await button(app.render(), 'Copiar código Pix').props.onPress();
    assert.equal(app.copies.length, 0);
    assert.equal(qr(app.render()), null);
    assert.equal(app.alerts.at(-1)[0], 'Prazo encerrado');
    assert.deepEqual(app.api.calls.map(call => call[0]), ['POST', 'GET']);
});

test('relógio do aparelho adiantado não invalida reserva ativa no servidor', async () => {
    const app = setup();
    app.clock.now += 7200000;
    await button(app.render(), 'Gerar Pix').props.onPress();
    await button(app.render(), 'Copiar código Pix').props.onPress();
    assert.equal(app.copies[0], serverCode);
    assert.ok(qr(app.render()));
});

test('falhas de API e inscrição já aprovada não usam código local antigo', async () => {
    const app = setup();
    app.api.success = false;
    await button(app.render(), 'Gerar Pix').props.onPress();
    assert.equal(qr(app.render()), null);
    assert.equal(app.copies.length, 0);
    app.api.success = true;
    await button(app.render(), 'Gerar Pix').props.onPress();
    app.api.status = 'CONFIRMADA';
    await button(app.render(), 'Copiar código Pix').props.onPress();
    assert.equal(qr(app.render()), null);
    assert.equal(app.copies.length, 0);
});

test('valida propriedade e contrato, mantendo o payload completo sem alterações', () => {
    const app = setup();
    const data = quote(app.api.now);
    assert.equal(app.quoteService.readPixQuote({ success: true, data }, 'inscricao123', 'evt'), data);
    assert.equal(app.quoteService.readPixQuote({ success: true, data: null }, 'inscricao123', 'evt'), null);
    assert.throws(() => app.quoteService.readPixQuote({ success: true, data: null }, 'inscricao123', 'evt', false));
    for (const change of [{ inscricaoId: 'outro' }, { eventoId: 'outro' }, { amount: '75,00' }, { code: '' }, { expiresAt: data.createdAt }, { quoteId: '' }]) {
        assert.throws(() => app.quoteService.readPixQuote({ success: true, data: { ...data, ...change } }, 'inscricao123', 'evt'));
    }
});

test('serviço usa GET e POST vazio na rota correta sem enviar preço, chave ou prazo', async () => {
    const calls = [];
    const context = { exports: {}, require: name => {
        assert.equal(name, './eventosApi');
        const response = { data: { success: true, data: null }, headers: { date: 'Tue, 03 Nov 2026 14:00:00 GMT' } };
        return { get: async (...args) => { calls.push(['GET', ...args]); return response; }, post: async (...args) => { calls.push(['POST', ...args]); return response; } };
    } };
    vm.runInNewContext(compile('src/services/eventos/eventosService.js'), context);
    const { EventosService } = context.exports;
    const response = await EventosService.getPixQuote('inscricao123');
    await EventosService.generatePixQuote('inscricao123');
    assert.equal(JSON.stringify(calls), JSON.stringify([['GET', '/inscricoes/inscricao123/pix'], ['POST', '/inscricoes/inscricao123/pix', {}]]));
    assert.equal(response.serverNow, Date.parse('2026-11-03T14:00:00Z'));
});

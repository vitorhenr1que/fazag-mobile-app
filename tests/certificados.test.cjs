const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { transformSync } = require('@babel/core');

const { code } = transformSync(fs.readFileSync(path.join(__dirname, '../src/utils/certificados.js'), 'utf8'), {
    configFile: false, babelrc: false, plugins: ['@babel/plugin-transform-modules-commonjs'],
});
const context = { exports: {} };
vm.runInNewContext(code, context);
const { listarCertificados, podeEmitirCertificado, getCertificadoUrl } = context.exports;
const agora = Date.parse('2026-10-08T12:00:00Z');
const evento = { dataInicio: '2026-10-01T10:00:00Z', dataFim: '2026-10-01T18:00:00Z' };

test('reúne todos os emitidos e as participações elegíveis, sem exigir presença para certificados existentes', () => {
    const inscricoes = [
        { id: 'emitido', certificado: { codigoValidacao: 'abc' } },
        { id: 'principal', evento, checkIn: true },
        { id: 'atividade', evento, subeventosEscolhidos: [{ checkIn: true }] },
        { id: 'ausente', evento },
        { id: 'futuro', evento: { dataFim: '2026-11-01T18:00:00Z' }, presenca: true },
    ];
    assert.deepEqual(Array.from(listarCertificados(inscricoes, agora), item => item.id), ['emitido', 'principal', 'atividade']);
});

test('respeita o término e não emite para datas ausentes ou inválidas', () => {
    assert.equal(podeEmitirCertificado({ evento, presenca: true }, agora), true);
    assert.equal(podeEmitirCertificado({ evento, presenca: true }, Date.parse(evento.dataFim)), false);
    assert.equal(podeEmitirCertificado({ presenca: true }, agora), false);
    assert.equal(podeEmitirCertificado({ evento: { dataFim: 'inválida' }, presenca: true }, agora), false);
    assert.equal(podeEmitirCertificado({ evento: { dataInicio: evento.dataInicio }, presenca: true }, agora), true);
});

test('abre a URL emitida ou usa o código de validação sem emitir novamente', () => {
    assert.equal(getCertificadoUrl({ urlPublica: 'https://eventos.fazag.edu.br/documento.pdf', codigoValidacao: 'abc' }), 'https://eventos.fazag.edu.br/documento.pdf');
    assert.equal(getCertificadoUrl({ codigoValidacao: 'abc/123' }), 'https://eventos.fazag.edu.br/certificados/abc%2F123');
    assert.equal(getCertificadoUrl(null), null);
    assert.equal(getCertificadoUrl({}), null);
});

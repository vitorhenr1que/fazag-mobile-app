const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { transformSync } = require('@babel/core');

const { code } = transformSync(fs.readFileSync(path.join(__dirname, '../src/utils/junteSeANos.js'), 'utf8'), {
    configFile: false, babelrc: false, plugins: ['@babel/plugin-transform-modules-commonjs'],
});
const context = { exports: {} };
vm.runInNewContext(code, context);
const { criarPayloadIndicacao, mensagemErroIndicacao } = context.exports;
const aluno = { name: 'Maria Silva', cpf: '012.345.678-90', curso: 'Administração', id: '000123' };
const indicado = { nome: ' João Souza ', curso: ' Direito ', telefone: '(75) 99999-9999' };

test('gera o contrato da API com dados da sessão e preserva zeros iniciais', () => {
    const payload = criarPayloadIndicacao(aluno, indicado);
    assert.deepEqual(JSON.parse(JSON.stringify(payload)), {
        nome_aluno: 'Maria Silva', cpf_aluno: '01234567890', curso_aluno: 'Administração', numero_matricula: '000123',
        nome_indicado: 'João Souza', curso_indicado: 'Direito', telefone_indicado: '75999999999',
    });
});

test('aceita campos originais do aluno e dá preferência à matrícula explícita', () => {
    const payload = criarPayloadIndicacao({ aluno_nome: 'Maria', aluno_cpf: aluno.cpf, cursos: [{ curso_descricao: ' Administração ' }], aluno_id: 'ID', numero_matricula: '000123' }, indicado);
    assert.equal(payload.nome_aluno, 'Maria');
    assert.equal(payload.curso_aluno, 'Administração');
    assert.equal(payload.numero_matricula, '000123');
    assert.equal(criarPayloadIndicacao(aluno, { ...indicado, telefone: '7533334444' }).telefone_indicado, '7533334444');
});

test('impede envio sem identidade completa ou campos obrigatórios', () => {
    for (const user of [null, { ...aluno, cpf: '' }, { ...aluno, curso: '' }, { ...aluno, id: '' }, { ...aluno, cpf: '123' }]) {
        assert.throws(() => criarPayloadIndicacao(user, indicado), /dados de aluno/);
    }
    for (const campo of ['nome', 'curso', 'telefone']) {
        assert.throws(() => criarPayloadIndicacao(aluno, { ...indicado, [campo]: ' ' }), /Preencha/);
    }
});

test('rejeita telefones incompletos, sem DDD ou com excesso de dígitos', () => {
    for (const telefone of ['999999999', '00999999999', '5575999999999', 'abc']) {
        assert.throws(() => criarPayloadIndicacao(aluno, { ...indicado, telefone }), /telefone válido|Preencha/);
    }
});

test('explica duplicidade e mantém falhas internas fora da interface', () => {
    assert.match(mensagemErroIndicacao({ response: { status: 409 } }), /primeiro aluno/);
    assert.match(mensagemErroIndicacao({ response: { status: 500, data: { message: 'SQL error' } } }), /tente novamente/);
    assert.match(mensagemErroIndicacao(new Error('Network Error')), /conexão/);
});

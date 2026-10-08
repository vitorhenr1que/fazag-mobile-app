const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const { transformSync } = require('@babel/core');

const { code } = transformSync(fs.readFileSync(path.join(__dirname, '../src/utils/clipboard.js'), 'utf8'), {
    configFile: false, babelrc: false,
    plugins: ['@babel/plugin-transform-modules-commonjs'],
});

function load({ os = 'android', expoClipboard = null, nativeClipboard = null, navigator } = {}) {
    const context = {
        exports: {}, navigator,
        require: (name) => {
            if (name === 'react-native') return {
                Platform: { OS: os }, NativeModules: {},
                TurboModuleRegistry: { get: () => nativeClipboard },
            };
            if (name === 'expo') return { requireOptionalNativeModule: () => expoClipboard };
            throw new Error(`Import inesperado: ${name}`);
        },
    };
    vm.runInNewContext(code, context);
    return context.exports.copyToClipboard;
}

test('importa sem ExpoClipboard e copia usando o módulo nativo já instalado', async () => {
    let copied;
    const copy = load({ nativeClipboard: { setString: (text) => { copied = text; } } });
    assert.equal(await copy('codigo-pix'), true);
    assert.equal(copied, 'codigo-pix');
});

test('ausência de ambos os módulos permite a alternativa de cópia manual', async () => {
    assert.equal(await load()('codigo-pix'), false);
});

test('usa ExpoClipboard quando disponível', async () => {
    let copied;
    const copy = load({ expoClipboard: { setStringAsync: async (text, options) => {
        copied = text;
        assert.equal(options.inputFormat, 'plainText');
        return true;
    } } });
    assert.equal(await copy('codigo-pix'), true);
    assert.equal(copied, 'codigo-pix');
});

test('copia no navegador sem acessar módulos nativos', async () => {
    let copied;
    const copy = load({ os: 'web', navigator: { clipboard: { writeText: async (text) => { copied = text; } } } });
    assert.equal(await copy('codigo-pix'), true);
    assert.equal(copied, 'codigo-pix');
    assert.equal(await load({ os: 'web' })('codigo-pix'), false);
});

test('propaga falha na cópia para o aviso de cópia manual da tela', async () => {
    const copy = load({ expoClipboard: { setStringAsync: async () => { throw new Error('Falha na cópia'); } } });
    await assert.rejects(copy('codigo-pix'), /Falha na cópia/);
});

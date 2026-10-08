const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const { transformSync } = require('@babel/core');

function compile(file) {
    return transformSync(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
        configFile: false, babelrc: false, plugins: ['@babel/plugin-transform-modules-commonjs'],
    }).code;
}
const versionContext = { exports: {} };
vm.runInNewContext(compile('src/utils/appVersion.js'), versionContext);
const { isOlderVersion } = versionContext.exports;
const configContext = { exports: {}, process: { env: {} } };
vm.runInNewContext(compile('src/config/appUpdates.js'), configContext);

function setup({ os = 'android', installed = '1.1.0', dev = false, environment = 'standalone', missingModule = false, url, get, openURL } = {}) {
    const alerts = [];
    const links = [];
    const context = {
        exports: {}, __DEV__: dev,
        require(name) {
            if (name === 'react-native') return {
                Platform: { OS: os },
                Alert: { alert: (...args) => alerts.push(args) },
                Linking: { openURL: async value => { links.push(value); if (openURL) await openURL(value); } },
            };
            if (name === 'expo-constants') return { executionEnvironment: environment, expoConfig: { version: '9.0.0' } };
            if (name === 'expo') return { requireOptionalNativeModule: () => missingModule ? null : { nativeApplicationVersion: installed, applicationId: 'com.fazag' } };
            if (name === 'axios') return { get };
            if (name === '../config/appUpdates') return { ...configContext.exports, APP_UPDATES_URL: url };
            if (name === '../utils/appVersion') return versionContext.exports;
            throw new Error(`Import inesperado: ${name}`);
        },
    };
    vm.runInNewContext(compile('src/services/appUpdates.js'), context);
    return { ...context.exports, alerts, links };
}

test('compara versões numericamente, incluindo diferenças de quantidade de segmentos', () => {
    assert.equal(isOlderVersion('1.9.0', '1.10.0'), true);
    assert.equal(isOlderVersion('1.2', '1.2.0'), false);
    assert.equal(isOlderVersion('1.2.0', '1.2.0'), false);
    assert.equal(isOlderVersion('2.0.0', '1.2.0'), false);
    for (const value of [null, '', 'inválida', '1.2-beta', '1..2']) {
        assert.equal(isOlderVersion(value, '1.2.0'), false);
        assert.equal(isOlderVersion('1.0.0', value), false);
    }
});

test('Android desatualizado exibe aviso e Atualizar agora abre o deeplink da Play Store', async () => {
    const app = setup();
    assert.equal(await app.promptStoreUpdate(), true);
    assert.match(app.alerts[0][1], /Play Store/);
    await app.alerts[0][2].find(button => button.text === 'Atualizar agora').onPress();
    assert.deepEqual(app.links, ['market://details?id=com.fazag']);
    assert.equal(app.alerts[0][2][0].text, 'Mais tarde');
});

test('iOS desatualizado abre a App Store correta', async () => {
    const app = setup({ os: 'ios' });
    assert.equal(await app.promptStoreUpdate(), true);
    assert.match(app.alerts[0][1], /App Store/);
    await app.openAppStore();
    assert.deepEqual(app.links, ['itms-apps://apps.apple.com/br/app/fazag/id6447904241']);
});

test('versão igual ou superior não exibe aviso, independentemente da versão OTA', async () => {
    for (const installed of ['1.2.0', '1.3.0']) {
        const app = setup({ installed });
        assert.equal(await app.promptStoreUpdate(), false);
        assert.equal(app.alerts.length, 0);
    }
});

test('não exibe aviso no desenvolvimento, Expo Go, web ou builds sem módulo nativo', async () => {
    for (const options of [{ dev: true }, { environment: 'storeClient' }, { os: 'web' }, { missingModule: true }, { installed: null }]) {
        const app = setup(options);
        assert.equal(await app.promptStoreUpdate(), false);
        assert.equal(app.alerts.length, 0);
    }
});

test('consulta remota usa a versão específica da plataforma com timeout', async () => {
    const app = setup({ installed: '1.2.0', url: 'https://example.com/versions.json', get: async (url, options) => {
        assert.equal(url, 'https://example.com/versions.json');
        assert.equal(options.timeout, 5000);
        return { data: { android: { latestVersion: '1.3.0' }, ios: { latestVersion: '1.2.0' } } };
    } });
    assert.equal(await app.promptStoreUpdate(), true);
    assert.match(app.alerts[0][1], /1\.3\.0/);
});

test('falha de rede usa a configuração local e resposta inválida não avisa', async () => {
    const offline = setup({ url: 'https://example.com/versions.json', get: async () => { throw new Error('offline'); } });
    assert.equal(await offline.promptStoreUpdate(), true);
    const invalid = setup({ url: 'https://example.com/versions.json', get: async () => ({ data: {} }) });
    assert.equal(await invalid.promptStoreUpdate(), false);
});

test('deeplink indisponível abre o endereço HTTPS da loja', async () => {
    const app = setup({ openURL: async value => { if (value.startsWith('market:')) throw new Error('sem loja'); } });
    await app.openAppStore();
    assert.deepEqual(app.links, ['market://details?id=com.fazag', 'https://play.google.com/store/apps/details?id=com.fazag']);
});

test('falha em abrir ambos os links mostra alternativa sem rejeição não tratada', async () => {
    const app = setup({ os: 'ios', openURL: async () => { throw new Error('sem navegador'); } });
    await app.openAppStore();
    assert.equal(app.links.length, 2);
    assert.equal(app.alerts[0][0], 'Não foi possível abrir a loja');
});

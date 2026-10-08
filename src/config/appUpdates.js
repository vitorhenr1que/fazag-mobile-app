// Alterar somente depois que a versão estiver disponível para todos na loja.
// Este arquivo também pode ser atualizado via EAS Update.
export const APP_UPDATES = {
    android: { latestVersion: '1.2.0' },
    ios: { latestVersion: '1.2.0' },
};

// Opcional: JSON remoto com o mesmo formato de APP_UPDATES.
export const APP_UPDATES_URL = process.env.EXPO_PUBLIC_APP_UPDATES_URL;

export const APP_STORES = {
    android: {
        name: 'Play Store',
        deepLink: 'market://details?id=com.fazag',
        webUrl: 'https://play.google.com/store/apps/details?id=com.fazag',
    },
    ios: {
        name: 'App Store',
        deepLink: 'itms-apps://apps.apple.com/br/app/fazag/id6447904241',
        webUrl: 'https://apps.apple.com/br/app/fazag/id6447904241',
    },
};

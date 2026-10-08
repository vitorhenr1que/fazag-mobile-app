import axios from 'axios';
import Constants from 'expo-constants';
import { requireOptionalNativeModule } from 'expo';
import { Alert, Linking, Platform } from 'react-native';
import { APP_STORES, APP_UPDATES, APP_UPDATES_URL } from '../config/appUpdates';
import { isOlderVersion } from '../utils/appVersion';

export async function openAppStore() {
    const store = APP_STORES[Platform.OS];
    if (!store) return;
    try {
        await Linking.openURL(store.deepLink);
    } catch {
        try {
            await Linking.openURL(store.webUrl);
        } catch {
            Alert.alert('Não foi possível abrir a loja', `Abra a ${store.name} e procure por FAZAG para atualizar o aplicativo.`);
        }
    }
}

// Retorna true quando mostra o aviso, para não exibir outro alerta de OTA junto.
export async function promptStoreUpdate() {
    const store = APP_STORES[Platform.OS];
    if (!store || __DEV__ || Constants.executionEnvironment === 'storeClient') return false;

    // O módulo opcional mantém compatibilidade com builds antigos sem ExpoApplication.
    // Não usamos expoConfig.version: ela pode mudar via OTA sem atualizar o binário.
    const application = requireOptionalNativeModule('ExpoApplication');
    const installedVersion = application?.nativeApplicationVersion;
    if (!installedVersion || application?.applicationId !== 'com.fazag') return false;

    let config = APP_UPDATES;
    if (APP_UPDATES_URL) {
        try {
            const response = await axios.get(APP_UPDATES_URL, { timeout: 5000 });
            config = response.data;
        } catch {
            // Sem rede, ainda podemos usar a última versão publicada conhecida.
        }
    }
    const latestVersion = config?.[Platform.OS]?.latestVersion;
    if (!isOlderVersion(installedVersion, latestVersion)) return false;

    Alert.alert(
        'Atualização disponível',
        `Seu aplicativo FAZAG está desatualizado. Atualize para a versão ${latestVersion} na ${store.name} para acessar as novidades e melhorias.`,
        [
            { text: 'Mais tarde', style: 'cancel' },
            { text: 'Atualizar agora', onPress: openAppStore },
        ],
    );
    return true;
}

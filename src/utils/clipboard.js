import { NativeModules, Platform, TurboModuleRegistry } from 'react-native';
import { requireOptionalNativeModule } from 'expo';

export async function copyToClipboard(text) {
    if (Platform.OS === 'web') {
        if (!globalThis.navigator?.clipboard?.writeText) return false;
        await globalThis.navigator.clipboard.writeText(text);
        return true;
    }

    // Builds anteriores podem ainda não incluir o módulo do expo-clipboard.
    const expoClipboard = requireOptionalNativeModule('ExpoClipboard');
    if (expoClipboard?.setStringAsync) {
        return expoClipboard.setStringAsync(text, { inputFormat: 'plainText' });
    }

    const nativeClipboard = TurboModuleRegistry.get('Clipboard') || NativeModules.Clipboard;
    if (!nativeClipboard?.setString) return false;
    nativeClipboard.setString(text);
    return true;
}

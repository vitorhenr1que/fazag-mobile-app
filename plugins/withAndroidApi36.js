const { AndroidConfig, withAndroidManifest, withProjectBuildGradle } = require('expo/config-plugins');

// Expo SDK 53 / React Native 0.79 usam AGP 8.8.2 por padrão.
// AGP 8.10.1 suporta a API 36 e o Gradle 8.13 do template atual.
// Aplicar no prebuild garante que a configuração também chegue ao EAS Build.
module.exports = function withAndroidApi36(config) {
    config = withAndroidManifest(config, config => {
        // RN 0.79 ainda encaminha o botão Voltar por onBackPressed.
        // API 36 desativa esse callback quando o predictive back está habilitado.
        const application = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
        application.$['android:enableOnBackInvokedCallback'] = 'false';
        return config;
    });
    return withProjectBuildGradle(config, config => {
        const dependency = /classpath\s*\(\s*(['"])com\.android\.tools\.build:gradle(?::[^'"]+)?\1\s*\)/;
        if (config.modResults.language !== 'groovy' || !dependency.test(config.modResults.contents)) {
            throw new Error('Não foi possível configurar AGP para API 36: revise o template de android/build.gradle.');
        }
        config.modResults.contents = config.modResults.contents.replace(
            dependency,
            "classpath('com.android.tools.build:gradle:8.10.1')",
        );
        return config;
    });
};

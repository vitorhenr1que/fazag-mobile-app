# Android 16 / API 36

`app.json` e a configuração alternativa `config.json` usam `compileSdkVersion: 36`, `targetSdkVersion: 36` e Build Tools `36.0.0` via `expo-build-properties`.

O plugin local `plugins/withAndroidApi36.js` seleciona Android Gradle Plugin 8.10.1 no prebuild. O AGP 8.8.2 padrão do Expo SDK 53 / React Native 0.79 não tem suporte oficial à API 36. AGP 8.10 suporta API 36, requer Gradle 8.11.1 ou superior e JDK 17; o template atual usa Gradle 8.13.

O modo edge-to-edge está habilitado. O componente raiz protege o conteúdo no Android com as margens de `react-native-safe-area-context`, e o cabeçalho não adiciona novamente a altura da barra de status. O plugin também desativa temporariamente predictive back, preservando a integração de Voltar do React Native 0.79 baseada em `onBackPressed`. Ao atualizar o Expo/React Native, reavaliar esse plugin e a possibilidade de ativar predictive back.

As pastas nativas são ignoradas pelo Git. As mudanças ficam nos arquivos de configuração e no plugin para que sejam reproduzidas no EAS Build. Para sincronizar a pasta Android local:

```sh
npx expo prebuild --platform android --no-install
```

O ambiente de compilação local precisa de JDK 17, Android SDK Platform 36, Build Tools 36.0.0 e do NDK exigido pelo projeto. Para gerar o AAB de produção pelo EAS:

```sh
eas build --platform android --profile production
```

Essa alteração exige um novo build nativo e o envio do AAB para a Play Console. Uma atualização OTA não altera o SDK alvo. Antes de publicar, verificar login, navegação Voltar, teclado, certificados, PDFs e as margens da tela em um dispositivo Android 16.

Referências: [configuração do Android 16](https://developer.android.com/about/versions/16/setup-sdk), [compatibilidade do AGP 8.10](https://developer.android.com/build/releases/agp-8-10-0-release-notes), [mudanças de comportamento da API 36](https://developer.android.com/about/versions/16/behavior-changes-16).

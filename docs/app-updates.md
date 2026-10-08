# Aviso de atualização do aplicativo

Na abertura do app em produção, a versão instalada é comparada com `latestVersion` da plataforma em `src/config/appUpdates.js`. Quando estiver desatualizado, o usuário pode atualizar agora ou continuar usando o app. O botão tenta abrir a loja nativa e, se não conseguir, abre a página da loja pelo navegador.

As versões de referência iniciais são 1.2.0 para Android e iOS, conferidas nas lojas em 08/10/2026. Altere cada plataforma somente quando a nova versão estiver disponível para todos os usuários na respectiva loja, após concluir eventual distribuição gradual.

O arquivo de configuração pode ser distribuído via EAS Update. Para controlar as versões pelo backend sem precisar publicar uma atualização OTA, configure `EXPO_PUBLIC_APP_UPDATES_URL` antes de gerar o bundle. A URL deve responder com JSON neste formato:

```json
{
  "android": { "latestVersion": "1.2.0" },
  "ios": { "latestVersion": "1.2.0" }
}
```

A consulta tem limite de cinco segundos. Em caso de falha de conexão, usa a configuração local. Versões ausentes ou inválidas não geram aviso.

A leitura da versão instalada depende do módulo nativo `expo-application`, incluído nesta alteração. É necessário gerar novos builds Android/iOS para incluí-lo. Builds antigos sem esse módulo continuam funcionando, mas não fazem a verificação. Uma atualização OTA sozinha não adiciona o módulo nativo. A versão de `app.json` não é usada para identificar o binário instalado porque pode mudar via OTA.

O aviso fica desativado no desenvolvimento, Expo Go e web. Quando exibido, tem prioridade sobre o alerta de reinício da atualização OTA naquela abertura do app.

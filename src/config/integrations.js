/**
 * Configurações de Integração do App
 * Permite alternar rapidamente entre provedores de dados.
 */

export const INTEGRATION_MODE = 'ACADWEB'; // Opções: 'QUALINFO', 'ACADWEB'

export const CONFIG = {
    MODE: INTEGRATION_MODE,
    IS_MOCKED: INTEGRATION_MODE === 'QUALINFO', // Mantém backward compatibility se necessário
    API_TIMEOUT: 15000,
    ACADWEB_BASE_URL: 'https://api.acadweb.com.br/fazag',
    ACADWEB_TOKEN: '1|tXc4KMgDZwzCST00Wf3EmkOchvB0gOjAfMqsEaIg8742b5d5'
};


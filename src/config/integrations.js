/**
 * Configurações de Integração do App
 * Permite alternar rapidamente entre provedores de dados.
 */

export const INTEGRATION_MODE = 'QUALINFO'; // Altere para 'JAGUAR' quando necessário

export const CONFIG = {
    MODE: INTEGRATION_MODE,
    IS_MOCKED: INTEGRATION_MODE === 'QUALINFO',
    API_TIMEOUT: 15000,
};

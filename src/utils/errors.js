/**
 * Padronização de erros e mensagens para o usuário
 */
export const ERROR_MESSAGES = {
    SESSAO_EXPIRADA: 'Sua sessão expirou. Por favor, faça login novamente.',
    CONTA_INATIVA: 'Sua matrícula está inativa. Entre em contato com a secretaria.',
    ERRO_CONEXAO: 'Não foi possível conectar ao servidor. Verifique sua internet.',
    CREDENCIAIS_INVALIDAS: 'Usuário ou senha incorretos.',
    GENERICO: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
};

export const parseApiError = (error) => {
    if (!error.response) return ERROR_MESSAGES.ERRO_CONEXAO;

    if (error.response.status === 401) return ERROR_MESSAGES.SESSAO_EXPIRADA;
    if (error.response.status === 403) return ERROR_MESSAGES.CONTA_INATIVA;

    return error.response.data?.message || ERROR_MESSAGES.GENERICO;
};

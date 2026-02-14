import eventosApi from './eventosApi';

export const EventosService = {
    // 1. Autenticação e Perfil

    /**
     * Verifica se o aluno existe no sistema de eventos
     * @param {string} matricula 
     */
    getAluno: async (matricula) => {
        try {
            const response = await eventosApi.get(`/alunos?id=${matricula}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null;
            }
            throw error;
        }
    },

    /**
     * Cria ou atualiza os dados do aluno no sistema de eventos
     * @param {Object} data { id, nome, email }
     */
    upsertAluno: async (data) => {
        const response = await eventosApi.post('/alunos', data);
        return response.data;
    },

    // 2. Eventos

    /**
     * Lista todos os eventos disponíveis
     */
    listEventos: async () => {
        const response = await eventosApi.get('/eventos');
        return response.data;
    },

    /**
     * Retorna detalhes de um evento específico
     * @param {string} id 
     */
    getEventoById: async (id) => {
        const response = await eventosApi.get(`/eventos/${id}`);
        return response.data;
    },

    /**
     * Inscreve o aluno no evento principal
     * @param {string} eventoId 
     */
    registerForEvento: async (eventoId) => {
        const response = await eventosApi.post(`/eventos/${eventoId}/inscricoes`, {});
        return response.data;
    },

    // 3. Gestão da Inscrição (Área do Aluno)

    /**
     * Lista as inscrições do aluno logado
     */
    listMinhasInscricoes: async (matricula) => {
        const response = await eventosApi.get('/minhas-inscricoes/', {
            headers: {
                'x-aluno-id': matricula
            }
        });
        return response.data;
    },

    /**
     * Retorna detalhes de uma inscrição
     * @param {string} inscricaoId 
     */
    getInscricaoDetail: async (inscricaoId) => {
        const response = await eventosApi.get(`/inscricoes/${inscricaoId}`);
        return response.data;
    },

    /**
     * Inscreve o aluno em subeventos
     * @param {string} inscricaoId 
     * @param {string[]} subeventoIds 
     */
    registerForSubEventos: async (inscricaoId, subeventoIds) => {
        const response = await eventosApi.post(`/inscricoes/${inscricaoId}/subeventos`, {
            inscricaoId,
            subeventoIds, // Cobertura para snake_case parcial
            subEventosIds: subeventoIds // Cobertura para camelCase
        });
        return response.data;
    },

    // 4. Funcionalidades Avançadas

    /**
     * Realiza check-in no evento principal
     */
    checkInEvento: async (inscricaoId) => {
        const response = await eventosApi.post(`/inscricoes/${inscricaoId}/checkin`, {});
        return response.data;
    },

    /**
     * Realiza check-in em um subevento
     */
    checkInSubEvento: async (inscricaoId, subeventoId) => {
        const response = await eventosApi.post(`/inscricoes/${inscricaoId}/checkin-subevento/${subeventoId}`, {});
        return response.data;
    },

    /**
     * Emite o certificado para uma inscrição
     */
    emitirCertificado: async (inscricaoId) => {
        const response = await eventosApi.post(`/inscricoes/${inscricaoId}/certificado/emitir`, {});
        return response.data;
    }
};

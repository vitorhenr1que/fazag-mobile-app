import apiClient from '../../api/client';

/**
 * Acadweb Data Layer: Integração oficial com a API Acadweb.
 */
export const AcadwebDataLayer = {

    async signIn(login, senha) {
        try {
            const response = await apiClient.post('/alunos/autenticacao', { login, senha });
            
            // A API do Acadweb geralmente retorna os dados do aluno diretamente ou dentro de um objeto
            // Vamos assumir que retorna o objeto do aluno se o login for bem sucedido.
            // O usuário forneceu um exemplo de body, mas não a resposta exata.
            // Geralmente essas APIs retornam { data: { ...aluno } } ou o aluno direto.
            
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Usuário ou senha inválidos');
            }
            throw new Error('Falha na autenticação com o servidor');
        }
    },

    async getTitulos(matricula) {
        const response = await apiClient.get('/financeiro/titulos', {
            params: { matricula }
        });
        return response.data;
    },

    async getBaixas(matricula) {
        const response = await apiClient.get('/financeiro/baixas', {
            params: { matricula }
        });
        return response.data;
    },

    async getBeneficios(matricula) {
        const response = await apiClient.get('/financeiro/beneficios', {
            params: { matricula }
        });
        return response.data;
    }
};

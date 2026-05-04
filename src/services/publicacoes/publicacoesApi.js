import axios from 'axios';

const publicacoesApi = axios.create({
    baseURL: 'https://fazag.edu.br/api',
});

export const getPublicacoes = async () => {
    try {
        const response = await publicacoesApi.get('/publicacoes-institucionais');
        return response.data;
    } catch (error) {
        console.error('Error fetching publicacoes:', error);
        throw error;
    }
};

export default publicacoesApi;

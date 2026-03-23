import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../config/integrations';

const apiClient = axios.create({
    baseURL: CONFIG.MODE === 'ACADWEB' ? CONFIG.ACADWEB_BASE_URL : (CONFIG.IS_MOCKED ? 'http://localhost/mock' : 'https://api.qualinfo.com.br/v1'),
    timeout: CONFIG.API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        ...(CONFIG.MODE === 'ACADWEB' && { 'Authorization': `Bearer ${CONFIG.ACADWEB_TOKEN}` })
    }
});

// Interceptor para injetar TOKEN JWT (para outros provedores ou se ACADWEB tiver um token de usuário adicional)
apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token && CONFIG.MODE !== 'ACADWEB') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para tratar expiração de sessão (401)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Lógica de refresh token ou logout automático aqui
            console.warn('Sessão expirada. Redirecionando...');
        }
        return Promise.reject(error);
    }
);

export default apiClient;

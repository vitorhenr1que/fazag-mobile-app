import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const eventosApi = axios.create({
    baseURL: 'https://eventos.fazag.edu.br/api',
});

eventosApi.interceptors.request.use(async (config) => {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
        const user = JSON.parse(userJson);
        const alunoId = user.aluno_id || user.id;
        if (alunoId) {
            config.headers['x-aluno-id'] = alunoId;
        }
    }
    return config;
});

export default eventosApi;

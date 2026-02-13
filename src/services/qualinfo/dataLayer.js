import apiClient from '../../api/client';
import { CONFIG } from '../../config/integrations';
import { QualinfoService } from './qualinfoService';
import { QualinfoValidator } from './schemas';

/**
 * Data Layer: Centraliza as chamadas de dados e decide entre MOCK e REAL.
 * Agora inclui validação de contrato via Schemas.
 */
export const QualinfoDataLayer = {

    async signIn(usuario, pass) {
        let result;
        if (CONFIG.IS_MOCKED) {
            result = await QualinfoService.signIn(usuario, pass);
        } else {
            const { data } = await apiClient.post('/auth/login', { usuario, pass });
            result = data;
        }

        // Validação de segurança no contrato do Aluno
        if (result && result.user) {
            QualinfoValidator.validateAluno(result.user);
        }
        return result;
    },

    async getAluno(aluno_id) {
        let data;
        if (CONFIG.IS_MOCKED) {
            data = await QualinfoService.signIn('default', 'default').then(res => res.user);
        } else {
            const response = await apiClient.get(`/aluno/${aluno_id}`);
            data = response.data;
        }

        QualinfoValidator.validateAluno(data);
        return data;
    },

    async getTitulos(aluno_id, ano, semestre) {
        let data;
        if (CONFIG.IS_MOCKED) {
            data = await QualinfoService.getTitulos(aluno_id);
        } else {
            const response = await apiClient.get('/titulos', {
                params: { aluno_id, ano, semestre }
            });
            data = response.data;
        }

        // Valida cada título retornado
        if (Array.isArray(data)) {
            data.forEach(t => QualinfoValidator.validateTitulo(t));
        }
        return data;
    },

    async getPagamentos(aluno_id, ano, semestre) {
        let data;
        if (CONFIG.IS_MOCKED) {
            data = await QualinfoService.getPagamentos(aluno_id);
        } else {
            const response = await apiClient.get('/pagamentos', {
                params: { aluno_id, ano, semestre }
            });
            data = response.data;
        }

        if (Array.isArray(data)) {
            data.forEach(p => QualinfoValidator.validatePagamento(p));
        }

        return data;
    }
};

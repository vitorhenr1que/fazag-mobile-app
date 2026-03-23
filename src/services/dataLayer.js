import { QualinfoDataLayer } from './qualinfo/dataLayer';
import { AcadwebDataLayer } from './acadweb/dataLayer';
import { CONFIG } from '../config/integrations';
import { FinancialUtils } from './qualinfo/qualinfoService';

/**
 * Global Data Layer Router
 * Encapsula a lógica de qual provedor de dados utilizar.
 */
export const DataLayer = {
    async signIn(usuario, pass) {
        if (CONFIG.MODE === 'ACADWEB') {
            return AcadwebDataLayer.signIn(usuario, pass);
        }
        return QualinfoDataLayer.signIn(usuario, pass);
    },

    async getTitulos(aluno_id, ano, semestre) {
        if (CONFIG.MODE === 'ACADWEB') {
            try {
                const [titulos, baixas, beneficios] = await Promise.all([
                    AcadwebDataLayer.getTitulos(aluno_id),
                    AcadwebDataLayer.getBaixas(aluno_id),
                    AcadwebDataLayer.getBeneficios(aluno_id)
                ]);

                // Normalização: Combina títulos e baixas
                // Benefícios geralmente já vêm dentro dos títulos na maioria das APIs acadêmicas, 
                // mas caso contrário, o app está pronto para exibir se estiver no objeto item.beneficios
                
                const normalizedTitulos = (Array.isArray(titulos) ? titulos : []).map(t => {
                    // Mapeamento de situação específico para as convenções Acadweb/Fazag solicitadas:
                    // 'A' -> Aberto (usamos 'B' como código padrão interno para Aberto)
                    // 'B' -> Baixado/Pago (usamos 'P' como código padrão interno para Pago)
                    let situacaoNormalizada = t.situacao || t.titulo_situacao || 'A';
                    if (situacaoNormalizada === 'A') situacaoNormalizada = 'B';
                    else if (situacaoNormalizada === 'B') situacaoNormalizada = 'P';

                    const mappedTitle = {
                        ...t,
                        beneficios: t.beneficios || (Array.isArray(beneficios) ? beneficios.filter(b => b.titulo_id === t.id) : []),
                        titulo_situacao: situacaoNormalizada,
                        titulo_id: t.id || t.pk_titulo || t.titulo_id || Math.random(),
                        titulo_vencimento: t.titulo_vencimento || t.vencimento
                    };
                    return {
                        ...mappedTitle,
                        valor_final: FinancialUtils.calculateValorFinal(mappedTitle)
                    };
                });

                const normalizedBaixas = (Array.isArray(baixas) ? baixas : []).map(b => {
                    const mappedBaixa = {
                        ...b,
                        titulo_situacao: 'P',
                        titulo_id: b.id || b.pk_titulo || b.titulo_id || Math.random(),
                        titulo_vencimento: b.titulo_vencimento || b.vencimento
                    };
                    return {
                        ...mappedBaixa,
                        valor_final: FinancialUtils.calculateValorFinal(mappedBaixa)
                    };
                });

                const combined = [...normalizedTitulos, ...normalizedBaixas];

                // Ordenação por data de vencimento decrescente (mais recente primeiro)
                return combined.sort((a, b) => {
                    const dateA = new Date(a.vencimento || a.titulo_vencimento);
                    const dateB = new Date(b.vencimento || b.titulo_vencimento);
                    return dateB - dateA;
                });
            } catch (error) {
                console.error("Erro ao buscar dados financeiros Acadweb:", error);
                throw error;
            }
        }
        return QualinfoDataLayer.getTitulos(aluno_id, ano, semestre);
    }

    
    // Adicionar outros métodos conforme necessário (getAluno, etc)
};

/**
 * Mocks e Lógica de Integração com Qualinfo
 * Este serviço simula a API do Qualinfo até que ela esteja ativa.
 */

const MOCK_DELAY = 800;

// 1. Mock do Aluno (Fernando/Olivia)
const ALUNO_QUALINFO_MOCK = {
    aluno_id: "ADM200026",
    aluno_nome: "Fernando Figueiredo",
    aluno_nome_social: "Olivia Figueiredo",
    aluno_mae: "Clarice Mariana Vitória",
    aluno_pai: "Lorenzo Guilherme Cláudio Figueiredo",
    aluno_endereco: "Rua Calêndula",
    aluno_endereco_cep: "69099524",
    aluno_endereco_bairro: "Bairro Novo",
    aluno_endereco_cidade: "Recife",
    aluno_endereco_uf: "PE",
    aluno_sexo: "F",
    aluno_data_nascimento: "2000-02-09",
    aluno_uf_nascimento: "PE",
    aluno_naturalidade: "Recife",
    aluno_nacionalidade: "Brasileira",
    aluno_tipo_sanguineo: "O+",
    aluno_raca_id: 3,
    aluno_raca_descricao: "Parda",
    aluno_rg: "398059949",
    aluno_rg_orgao: "SDS PE",
    aluno_rg_data_expedicao: "2002-02-09",
    aluno_cpf: "67175535708",
    aluno_titulo_eleitoral: "175410650884",
    aluno_titulo_zona: "006",
    aluno_titulo_secao: "0324",
    aluno_reservista: "153109",
    aluno_reservista_categoria: "Dispensado do serviço militar",
    aluno_telefone_residencial: "8138660962",
    aluno_telefone_celular: "81991147250",
    aluno_telefone_comercial: "81991147250",
    aluno_telefone_fax: "8138660962",
    aluno_email: "exemplo@email.com.br",
    aluno_emancipado: "S",
    aluno_grau_instrucao_id: "03",
    aluno_grau_instrucao_descricao: "Ensino Médio",
    aluno_profissao_id: "027",
    aluno_profissoa_descricao: "Estudante",
    aluno_religiao_id: "01",
    aluno_religiao_descricao: "Agnistico",
    aluno_instituicao_2grau_id: "001",
    aluno_instituicao_2grau_descricao: "Escola Qualinfo",
    credor_nome: "Kauê Noah Yago Porto",
    credor_cpf: "03716471003",
    credor_endereco: "Rua Pedro Jusselino de Aquino",
    credor_endereco_cep: "58052370",
    credor_endereco_bairro: "Jardim Universitário",
    credor_endereco_cidade: "Recife",
    credor_endereco_uf: "PE",
    credor_telefone_residencial: "8129463856",
    credor_telefone_celular: "81999849284",
    credor_telefone_comercial: "81999849284",
    credor_telefone_fax: "8129463856",
    ativo: "I", // Inativo para teste de bloqueio
    aluno_origem: "CURSO",
    cursos: [
        {
            turma_id: "ADM01",
            curso_id: "00003",
            curso_descricao: "Técnico em Administração",
            situacao_id: "MT",
            situacao_descricao: "Matriculado"
        }
    ]
};

// 2. Mock de Títulos/Boletos
const TITULOS_MOCK = [
    {
        titulo_id: 1767110,
        taxa_id: "10587",
        taxa_descricao: "PARCELA-RFC",
        taxa_categoria: "00002",
        taxa_categoria_descricao: "Parcela",
        titulo_vencimento: "2026-03-05",
        titulo_valor: 591.34,
        titulo_mes_ref: "03",
        titulo_ano_ref: "2026",
        titulo_situacao: "P",
        titulo_observacao: "Aluno indicou o amigo",
        titulo_tipo: "Crédito",
        aluno_id: "ADM200026",
        aluno_nome: "Fernando Figueiredo",
        curso_id: "00003",
        curriculo_id: "ADM20111",
        turma_id: "ADM03-N",
        data_atualizacao: "2026-02-13",
        beneficios: [
            {
                titulo_id: 1,
                beneficio_id: "10",
                beneficio_incidencia: "I",
                beneficio_incidencia_grupo: "0",
                beneficio_tipo_grupo: "G",
                beneficio_descricao: "DESCONTO AUTORIZADO",
                beneficio_valor: "40",
                beneficio_dia_incidencia_inicial: "01",
                beneficio_dia_incidencia_final: "32",
                beneficio_tipo_valor: "P",
                data_atualizacao: "2018-08-13 00:00:00.000"
            }
        ]
    },
    {
        titulo_id: 176720,
        taxa_id: "10587",
        taxa_descricao: "PARCELA-RFC",
        taxa_categoria: "00002",
        taxa_categoria_descricao: "Parcela",
        titulo_vencimento: "2026-01-05",
        titulo_valor: 591.34,
        titulo_mes_ref: "01",
        titulo_ano_ref: "2026",
        titulo_situacao: "P",
        titulo_observacao: "Aluno indicou o amigo",
        titulo_tipo: "Crédito",
        aluno_id: "ADM200026",
        aluno_nome: "Fernando Figueiredo",
        curso_id: "00003",
        curriculo_id: "ADM20111",
        turma_id: "ADM03-N",
        data_atualizacao: "2026-01-05",
        beneficios: [
            {
                titulo_id: 1,
                beneficio_id: "10",
                beneficio_incidencia: "I",
                beneficio_incidencia_grupo: "0",
                beneficio_tipo_grupo: "G",
                beneficio_descricao: "DESCONTO AUTORIZADO",
                beneficio_valor: "40",
                beneficio_dia_incidencia_inicial: "01",
                beneficio_dia_incidencia_final: "32",
                beneficio_tipo_valor: "P",
                data_atualizacao: "2018-08-13 00:00:00.000"
            }
        ]
    },
    {
        titulo_id: 176725,
        taxa_id: "10582",
        taxa_descricao: "PARCELA-RFC",
        taxa_categoria: "00002",
        taxa_categoria_descricao: "Parcela",
        titulo_vencimento: "2026-02-05",
        titulo_valor: 591.34,
        titulo_mes_ref: "02",
        titulo_ano_ref: "2026",
        titulo_situacao: "B",
        titulo_observacao: "Aluno indicou o amigo",
        titulo_tipo: "Crédito",
        aluno_id: "ADM200026",
        aluno_nome: "Fernando Figueiredo",
        curso_id: "00003",
        curriculo_id: "ADM20111",
        turma_id: "ADM03-N",
        data_atualizacao: "2026-02-13",
        beneficios: [
            {
                titulo_id: 1,
                beneficio_id: "10",
                beneficio_incidencia: "I",
                beneficio_incidencia_grupo: "0",
                beneficio_tipo_grupo: "G",
                beneficio_descricao: "DESCONTO AUTORIZADO",
                beneficio_valor: "40",
                beneficio_dia_incidencia_inicial: "01",
                beneficio_dia_incidencia_final: "32",
                beneficio_tipo_valor: "P",
                data_atualizacao: "2018-08-13 00:00:00.000"
            }
        ]
    }
];

// 3. Mock de Pagamentos (Histórico conforme JSON base)
const PAGAMENTOS_MOCK = [
    {
        titulo_id: 1, // ID do vínculo de benefício
        beneficio_id: "10",
        beneficio_incidencia: "I",
        beneficio_incidencia_grupo: "0",
        beneficio_tipo_grupo: "G",
        beneficio_descricao: "DESCONTO AUTORIZADO",
        beneficio_valor: "63.0000",
        beneficio_dia_incidencia_inicial: "01",
        beneficio_dia_incidencia_final: "32",
        beneficio_tipo_valor: "P",
        data_atualizacao: "2018-08-13 00:00:00.000",
        titulo: [
            {
                titulo_id: 176720,
                taxa_id: "10587",
                taxa_descricao: "PARCELA-RFC",
                taxa_categoria: "00002",
                taxa_categoria_descricao: "Parcela",
                titulo_vencimento: "2023-04-24",
                titulo_valor: 591.34,
                titulo_mes_ref: "01",
                titulo_ano_ref: "2023",
                titulo_situacao: "P", // Marcar como Pago para histórico
                titulo_observacao: "Aluno indicou o amigo",
                titulo_tipo: "Crédito",
                aluno_id: "ADM200026",
                aluno_nome: "Fernando Figueiredo",
                curso_id: "00003",
                curriculo_id: "ADM20111",
                turma_id: "ADM03-N",
                data_atualizacao: "2023-04-25"
            }
        ]
    }
];

// 4. Utilitários Financeiros
export const FinancialUtils = {
    /**
     * Determina o semestre atual (Jan-Jun = 1, Jul-Dez = 2)
     */
    getCurrentSemesterData: () => {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        const year = now.getFullYear();
        const semester = month <= 6 ? 1 : 2;
        return { year, semester };
    },

    /**
     * Calcula o valor final aplicando descontos (P = Percentual, V = Valor Fixo)
     */
    calculateValorFinal: (titulo) => {
        let valorFinal = parseFloat(titulo.titulo_valor || 0);
        if (titulo.beneficios && titulo.beneficios.length > 0) {
            titulo.beneficios.forEach(ben => {
                const valorBen = parseFloat(ben.beneficio_valor || 0);
                if (ben.beneficio_tipo_valor === 'P') {
                    valorFinal -= (valorFinal * (valorBen / 100));
                } else if (ben.beneficio_tipo_valor === 'V') {
                    valorFinal -= valorBen;
                }
            });
        }
        return valorFinal > 0 ? valorFinal : 0;
    },

    /**
     * Filtra títulos por semestre (titulo_mes_ref + titulo_ano_ref)
     */
    filterBySemester: (titulos, year, semester) => {
        const semesterMonths = semester === 1
            ? ['01', '02', '03', '04', '05', '06']
            : ['07', '08', '09', '10', '11', '12'];

        return titulos.filter(t =>
            t.titulo_ano_ref === String(year) &&
            semesterMonths.includes(t.titulo_mes_ref)
        );
    },

    /**
     * Ordena títulos por vencimento ascendente
     */
    sortByDueDate: (titulos) => {
        return [...titulos].sort((a, b) =>
            new Date(a.titulo_vencimento) - new Date(b.titulo_vencimento)
        );
    },

    /**
     * Mapeia situação para status visual
     */
    getStatusMapping: (situacao) => {
        const mappings = {
            'B': { label: 'EM ABERTO', color: '#0ea5e9' }, // Blue Sky
            'V': { label: 'VENCIDO', color: '#ef4444' },   // Red vibrant
            'P': { label: 'PAGO', color: '#10b981' },      // Emerald Green (Premium)
            'C': { label: 'CANCELADO', color: '#94a3b8' }, // Slate Blue/Gray
            'A': { label: 'EM ACORDO', color: '#8b5cf6' }  // Violet/Purple
        };
        return mappings[situacao] || { label: 'DESCONHECIDO', color: '#7a7a7a' };
    },

    /**
     * Normaliza o retorno aninhado da API para uma lista simples de eventos de pagamento
     */
    normalizePagamentos: (data) => {
        return data.map(item => {
            const titulo = item.titulo && item.titulo[0] ? item.titulo[0] : {};

            return {
                id: item.titulo_id,
                titulo_origem_id: titulo.titulo_id,
                descricao: titulo.taxa_descricao || "Pagamento de Título",
                data_pagamento: titulo.data_atualizacao || titulo.titulo_vencimento,
                valor_original: titulo.titulo_valor || 0,
                valor_pago: FinancialUtils.calculateValorFinal({ ...titulo, beneficios: [item] }),
                referencia: `${titulo.titulo_mes_ref}/${titulo.titulo_ano_ref}`,
                metodo: "Não Especificado",
                comprovante_disponivel: true
            };
        });
    },

    /**
     * Gera o resumo financeiro para a Home
     */
    getSummary: (titulos) => {
        const agora = new Date();
        // Pendentes: Aberto, Vencido, Acordo
        const abertos = titulos.filter(t => ['B', 'V', 'A'].includes(t.titulo_situacao));
        const pagos = titulos.filter(t => t.titulo_situacao === 'P');

        const totalAberto = abertos.reduce((acc, t) => acc + (t.valor_final || t.titulo_valor), 0);
        const totalPago = pagos.reduce((acc, t) => acc + t.titulo_valor, 0);

        // Busca o título pendente com vencimento mais próximo
        const sortedAbertos = [...abertos].sort((a, b) => new Date(a.titulo_vencimento) - new Date(b.titulo_vencimento));
        const maisUrgente = sortedAbertos[0];

        // Se não houver pendentes, pegamos o status do último título processado (pago ou cancelado)
        let fallbackStatus = null;
        if (!maisUrgente && titulos.length > 0) {
            // Ordena por data de atualização ou vencimento decrescente para pegar o último
            const sortedTodos = [...titulos].sort((a, b) => new Date(b.titulo_vencimento) - new Date(a.titulo_vencimento));
            fallbackStatus = sortedTodos[0].titulo_situacao;
        }

        return {
            totalAberto,
            totalPago,
            proximoVencimento: maisUrgente ? maisUrgente.titulo_vencimento : null,
            proximoStatus: maisUrgente ? maisUrgente.titulo_situacao : fallbackStatus,
            quantidade: abertos.length
        };
    },

    /**
     * Formata data com segurança para evitar o erro de 'um dia a menos'
     * causado pelo fuso horário ao parsear strings YYYY-MM-DD.
     */
    formatDate: (dateString) => {
        if (!dateString) return '--/--/----';
        
        try {
            // Se já estiver no formato brasileiro (DD/MM/YYYY), retorna
            if (/^\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
                return dateString.substring(0, 10);
            }

            // Trata o formato ISO (YYYY-MM-DD...)
            const datePart = dateString.split('T')[0].split(' ')[0];
            if (datePart.includes('-')) {
                const parts = datePart.split('-');
                if (parts.length === 3) {
                    const [year, month, day] = parts;
                    return `${day}/${month}/${year}`;
                }
            }

            // Fallback para Date (usando T12:00:00 para evitar mudança de dia pelo fuso)
            const d = new Date(dateString.includes('T') ? dateString : `${dateString}T12:00:00`);
            if (!isNaN(d.getTime())) {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}/${month}/${year}`;
            }
        } catch (error) {
            console.error("Erro ao formatar data:", error);
        }
        
        return '--/--/----';
    }
};

// 5. Serviço Principal
export const QualinfoService = {
    async signIn(usuario, pass, options = {}) {
        const { fail = false, delay = MOCK_DELAY } = options;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (fail || usuario === 'erro') {
            throw new Error('Credenciais inválidas ou erro na API Qualinfo');
        }

        return {
            user: ALUNO_QUALINFO_MOCK,
            token: "mock_jwt_token_olivia_" + Date.now()
        };
    },

    async getTitulos(aluno_id, options = {}) {
        const { fail = false, delay = MOCK_DELAY } = options;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (fail) throw new Error('Erro ao buscar títulos');

        // Aplicando regras de negócio no Mock
        const { year, semester } = FinancialUtils.getCurrentSemesterData();

        let result = TITULOS_MOCK.filter(t => t.aluno_id === aluno_id);

        // Filtro de Semestre (Seguindo especificação)
        result = FinancialUtils.filterBySemester(result, year, semester);

        // Cálculo e Ordenação
        const normalized = result.map(t => ({
            ...t,
            valor_final: FinancialUtils.calculateValorFinal(t)
        }));

        return FinancialUtils.sortByDueDate(normalized);
    },

    async getPagamentos(aluno_id, options = {}) {
        const { fail = false, delay = MOCK_DELAY } = options;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (fail) throw new Error('Erro ao buscar histórico de pagamentos');

        const rawData = PAGAMENTOS_MOCK.filter(p =>
            p.titulo && p.titulo[0] && p.titulo[0].aluno_id === aluno_id
        );

        return FinancialUtils.normalizePagamentos(rawData);
    }
};

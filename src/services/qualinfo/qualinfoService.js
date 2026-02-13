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
        titulo_id: 176720,
        taxa_id: "10587",
        taxa_descricao: "PARCELA-RFC",
        taxa_categoria: "00002",
        taxa_categoria_descricao: "Parcela",
        titulo_vencimento: "2026-04-24",
        titulo_valor: 591.34,
        titulo_mes_ref: "01",
        titulo_ano_ref: "2026",
        titulo_situacao: "B",
        titulo_observacao: "Aluno indicou o amigo",
        titulo_tipo: "Crédito",
        aluno_id: "ADM200026",
        aluno_nome: "Fernando Figueiredo",
        curso_id: "00003",
        curriculo_id: "ADM20111",
        turma_id: "ADM03-N",
        data_atualizacao: "2023-04-25",
        beneficios: [
            {
                titulo_id: 1,
                beneficio_id: "10",
                beneficio_incidencia: "I",
                beneficio_incidencia_grupo: "0",
                beneficio_tipo_grupo: "G",
                beneficio_descricao: "DESCONTO AUTORIZADO",
                beneficio_valor: "63.0000",
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
        let valorFinal = titulo.titulo_valor;
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
            'B': { label: 'EM ABERTO', color: '#0478F0' },
            'V': { label: 'VENCIDO', color: '#f63c5b' },
            'P': { label: 'PAGO', color: '#66CDAA' },
            'C': { label: 'CANCELADO', color: '#a9a9a9' },
            'A': { label: 'EM ACORDO', color: '#9370DB' }
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
        const abertos = titulos.filter(t => t.titulo_situacao === 'B');
        const pagos = titulos.filter(t => t.titulo_situacao === 'P');

        const totalAberto = abertos.reduce((acc, t) => acc + (t.valor_final || t.titulo_valor), 0);
        const totalPago = pagos.reduce((acc, t) => acc + t.titulo_valor, 0);

        const proximo = abertos
            .map(t => new Date(t.titulo_vencimento))
            .filter(d => d >= agora)
            .sort((a, b) => a - b)[0];

        return {
            totalAberto,
            totalPago,
            proximoVencimento: proximo ? proximo.toISOString() : null,
            quantidade: abertos.length
        };
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

import { z } from 'zod';

/**
 * Schemas de Validação Qualinfo via Zod
 * Garante a integridade dos dados e fornece erros descritivos.
 */

export const AlunoSchema = z.object({
    aluno_id: z.string(),
    aluno_nome: z.string(),
    aluno_nome_social: z.string().optional().nullable(),
    aluno_cpf: z.string(),
    cursos: z.array(z.object({
        curso_id: z.string(),
        curso_descricao: z.string(),
        situacao_descricao: z.string(),
    })).optional(),
}).passthrough(); // Permite campos extras que a API possa enviar

export const TituloSchema = z.object({
    titulo_id: z.number(),
    taxa_descricao: z.string(),
    titulo_vencimento: z.string(),
    titulo_valor: z.number(),
    titulo_situacao: z.enum(['B', 'V', 'P', 'C', 'A']),
    titulo_mes_ref: z.string(),
    titulo_ano_ref: z.string(),
    beneficios: z.array(z.any()).optional(),
}).passthrough();

export const PagamentoSchema = z.object({
    id: z.number().optional(),
    titulo_origem_id: z.number(),
    descricao: z.string(),
    data_pagamento: z.string(),
    valor_pago: z.number(),
    referencia: z.string(),
}).passthrough();

// Wrapper para validação segura
export const QualinfoValidator = {
    validateAluno: (data) => {
        const result = AlunoSchema.safeParse(data);
        if (!result.success) {
            console.warn('[Zod Validation Error - Aluno]:', result.error.format());
        }
        return result;
    },
    validateTitulo: (data) => {
        const result = TituloSchema.safeParse(data);
        if (!result.success) {
            console.warn('[Zod Validation Error - Titulo]:', result.error.format());
        }
        return result;
    },
    validatePagamento: (data) => {
        const result = PagamentoSchema.safeParse(data);
        if (!result.success) {
            console.warn('[Zod Validation Error - Pagamento]:', result.error.format());
        }
        return result;
    }
};

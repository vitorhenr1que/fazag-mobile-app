import { EventosService } from './eventosService';

// Valida o contrato recebido, sem recalcular código, valor ou prazo.
export function readPixQuote(response, inscricaoId, eventoId, allowNull = true) {
    if (!response?.success) throw new Error(response?.error?.message || 'Não foi possível consultar o Pix.');
    const quote = response.data;
    if (quote === null && allowNull) return null;
    if (!quote || typeof quote.quoteId !== 'string' || !quote.quoteId
        || String(quote.inscricaoId) !== String(inscricaoId) || String(quote.eventoId) !== String(eventoId)
        || typeof quote.code !== 'string' || !quote.code
        || typeof quote.amount !== 'string' || !/^\d+\.\d{2}$/.test(quote.amount)
        || !Number.isFinite(Number(quote.amount)) || Number(quote.amount) <= 0
        || typeof quote.txid !== 'string' || !/^[a-zA-Z0-9]{1,25}$/.test(quote.txid)
        || !Number.isFinite(quote.createdAt) || !Number.isFinite(quote.expiresAt)
        || quote.expiresAt <= quote.createdAt) {
        throw new Error('O servidor retornou uma reserva Pix inválida. Tente novamente.');
    }
    return quote;
}

export async function loadPixQuote(inscricaoId, eventoId) {
    const response = await EventosService.getPixQuote(inscricaoId);
    return { quote: readPixQuote(response, inscricaoId, eventoId), serverNow: response.serverNow };
}

export async function createPixQuote(inscricaoId, eventoId) {
    const response = await EventosService.generatePixQuote(inscricaoId);
    return { quote: readPixQuote(response, inscricaoId, eventoId, false), serverNow: response.serverNow };
}

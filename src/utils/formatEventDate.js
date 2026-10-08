import { format, isSameDay, isSameMonth, isSameYear, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatEventDate(dataInicio, dataFim) {
    const inicio = parseISO(dataInicio);
    const dataInicial = format(inicio, "dd 'de' MMMM", { locale: ptBR });

    if (!dataFim) return dataInicial;

    const fim = parseISO(dataFim);
    if (!isValid(fim) || isSameDay(inicio, fim)) return dataInicial;

    if (!isSameYear(inicio, fim)) {
        return `${format(inicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} a ${format(fim, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
    }

    const dataFinal = format(fim, "dd 'de' MMMM", { locale: ptBR });
    if (isSameMonth(inicio, fim)) {
        return `${format(inicio, 'dd')} a ${dataFinal}`;
    }

    return `${dataInicial} a ${dataFinal}`;
}

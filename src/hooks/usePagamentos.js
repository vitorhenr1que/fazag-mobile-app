import { useState, useEffect, useCallback } from 'react';
import { QualinfoDataLayer } from '../services/qualinfo/dataLayer';

/**
 * Hook para buscar e gerenciar o histórico de pagamentos.
 */
export function usePagamentos(aluno_id, ano, semestre) {
    const [pagamentos, setPagamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPagamentos = useCallback(async () => {
        if (!aluno_id) return;

        setLoading(true);
        setError(null);
        try {
            const data = await QualinfoDataLayer.getPagamentos(aluno_id, ano, semestre);
            setPagamentos(data);
        } catch (err) {
            setError({
                code: err.status || 'ERROR',
                message: 'Falha ao recuperar o histórico de pagamentos.'
            });
        } finally {
            setLoading(false);
        }
    }, [aluno_id, ano, semestre]);

    useEffect(() => {
        loadPagamentos();
    }, [loadPagamentos]);

    return { pagamentos, loading, error, refresh: loadPagamentos };
}

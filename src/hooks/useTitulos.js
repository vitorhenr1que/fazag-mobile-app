import { useState, useEffect, useCallback } from 'react';
import { QualinfoDataLayer } from '../services/qualinfo/dataLayer';

/**
 * Hook para buscar e gerenciar o estado dos títulos (boletos).
 */
export function useTitulos(aluno_id, ano, semestre) {
    const [titulos, setTitulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTitulos = useCallback(async () => {
        if (!aluno_id) return;

        setLoading(true);
        setError(null);
        try {
            const data = await QualinfoDataLayer.getTitulos(aluno_id, ano, semestre);
            setTitulos(data);
        } catch (err) {
            setError({
                code: err.status || 'ERROR',
                message: 'Não foi possível carregar os títulos financeiros.'
            });
        } finally {
            setLoading(false);
        }
    }, [aluno_id, ano, semestre]);

    useEffect(() => {
        loadTitulos();
    }, [loadTitulos]);

    return { titulos, loading, error, refresh: loadTitulos };
}

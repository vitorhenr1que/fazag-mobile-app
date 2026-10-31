const texto = value => String(value ?? '').trim();
const digitos = value => texto(value).replace(/\D/g, '');

export function criarPayloadIndicacao(user, indicado) {
    const payload = {
        nome_aluno: texto(user?.name || user?.aluno_nome_social || user?.aluno_nome),
        cpf_aluno: digitos(user?.cpf || user?.aluno_cpf),
        curso_aluno: texto(user?.curso || user?.cursos?.[0]?.curso_descricao || user?.curso_nome),
        numero_matricula: texto(user?.numero_matricula || user?.matricula || user?.id || user?.aluno_id),
        nome_indicado: texto(indicado.nome),
        curso_indicado: texto(indicado.curso),
        telefone_indicado: digitos(indicado.telefone),
    };

    if (!payload.nome_aluno || payload.cpf_aluno.length !== 11 || !payload.curso_aluno || !payload.numero_matricula) {
        throw new Error('Não foi possível identificar seus dados de aluno. Entre novamente no aplicativo. Se o problema continuar, procure a secretaria.');
    }
    if (!payload.nome_indicado || !payload.curso_indicado || !payload.telefone_indicado) {
        throw new Error('Preencha o nome completo, o curso de interesse e o telefone do indicado.');
    }
    if (!/^[1-9]{2}\d{8,9}$/.test(payload.telefone_indicado)) {
        throw new Error('Informe um telefone válido com DDD, contendo 10 ou 11 dígitos.');
    }
    return payload;
}

export function mensagemErroIndicacao(error) {
    if (error?.response?.status === 409) {
        return 'Este indicado já foi cadastrado. O benefício é reservado ao primeiro aluno que registrar a indicação.';
    }
    return 'Não foi possível enviar sua indicação. Verifique sua conexão e tente novamente. Se o problema continuar, procure a secretaria.';
}

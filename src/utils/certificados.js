// Usa as mesmas regras de presença e término do fluxo de inscrições.
export function podeEmitirCertificado(inscricao, agora = Date.now()) {
    const fim = inscricao.evento?.dataFim || inscricao.evento?.dataInicio;
    const encerrado = fim && agora > new Date(fim).getTime();
    const presente = !!inscricao.checkIn || !!inscricao.presenca ||
        (inscricao.subeventosEscolhidos || []).some(atividade => !!atividade.checkIn);
    return !!(encerrado && presente);
}

export function listarCertificados(inscricoes, agora = Date.now()) {
    return inscricoes.filter(inscricao => inscricao.certificado || podeEmitirCertificado(inscricao, agora));
}

export function getCertificadoUrl(certificado) {
    if (certificado?.urlPublica) return certificado.urlPublica;
    if (certificado?.codigoValidacao) {
        return `https://eventos.fazag.edu.br/certificados/${encodeURIComponent(certificado.codigoValidacao)}`;
    }
    return null;
}

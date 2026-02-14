export function nomeAluno(user) {
    // Suporte para novo contrato (Qualinfo) e legado (name)
    const fullName = user?.aluno_nome_social || user?.aluno_nome || user?.name || "Estudante";

    try {
        const names = fullName.split(' ');
        const firstName = names[0] || "Estudante";
        const firstNameLowerCase = firstName.toLowerCase().split("");

        if (firstNameLowerCase.length === 0) return "Estudante";

        const firstLetterUpperCase = firstNameLowerCase[0].toUpperCase()
        const restName = firstNameLowerCase.slice(1)
        const firstname = [firstLetterUpperCase, ...restName].join('')

        return firstname
    } catch (error) {
        return "Estudante"
    }
}
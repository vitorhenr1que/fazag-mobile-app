export const logIn = async (req) => {
    const params = {
        banco: 'jaguar_fazag',
         proc: `[FX jaguar fazag] "loginaluno", "${usuario}", "${pass}"`
        }
    const response = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', params).then(res => res.data)
    const isLogged = response[0]
    if(usuario === '' || pass === ''){
        console.log('Preencha os campos de Usuário e Senha')
    }
    else if (!!isLogged.a_id === true){
        setUser({
            id: isLogged.a_id,
            cpf: isLogged.au_cpf,
            email: isLogged.au_email,
        })
    }
    else {
        console.log('Usuário Inválido')
    }
}
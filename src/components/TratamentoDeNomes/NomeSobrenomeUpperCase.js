export function NomeSobrenomeUpperCase({name}){
    const nomeParticionado = name.split(' ') // pega o nome EM LETRA MAIUSCULA e particiona em array

     //     verifica se o nome da pessoa tem "dos, de..." e retorna o nome com isso 
        if(nomeParticionado[1] === 'DE' || nomeParticionado[1] === 'DO' || nomeParticionado[1] === 'DAS' || nomeParticionado[1] === 'DA' || nomeParticionado[1] === 'DAS' || nomeParticionado[1] === 'E'){
            return `${nomeParticionado[0]} ${nomeParticionado[1]} ${nomeParticionado[2]}`
        }
        return `${nomeParticionado[0]} ${nomeParticionado[1]}`
    
}
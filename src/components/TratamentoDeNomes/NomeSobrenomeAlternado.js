export function NomeSobrenomeAlternado({name}){
    const modifyName = []
    const nomeParticionado = name.split(' ') // pega o nome EM LETRA MAIUSCULA e particiona em array

    function verifyName(nomeAluno){ // Função que percorre a array particionada acima, transforma as letras e adiciona em uma nova array

        nomeAluno.map((index) => {
    
            if(index === 'DE' || index === 'DO' || index === 'DOS' || index === 'DA' || index === 'DAS' || index === 'E'){
                modifyName.push(index.toLowerCase())
            }
            else{
                const nomeAlternado = index[0].toUpperCase() + index.substring(1).toLowerCase() // Coloque o indice [0] da string MAIUSC... e pegue o restante (substring) à partir do índice 1 
                modifyName.push(nomeAlternado)
            }
        })  
    }
    
    const getModifiedName = () => {verifyName(nomeParticionado)}
    getModifiedName()
    
     //     verifica se o nome da pessoa tem "dos, de..." e retorna o nome com isso 
        if(modifyName[1] === 'de' || modifyName[1] === 'do' || modifyName[1] === 'dos' || modifyName[1] === 'da' || modifyName[1] === 'das' || modifyName[1] === 'e'){
            return `${modifyName[0]} ${modifyName[1]} ${modifyName[2]}`
        }
        return `${modifyName[0]} ${modifyName[1]}`
    
}

import { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextFont } from '../../components/Basics/TextFont'
import { NomeSobrenomeAlternado } from '../../components/TratamentoDeNomes/NomeSobrenomeAlternado'
import { NomeSobrenomeUpperCase } from '../../components/TratamentoDeNomes/NomeSobrenomeUpperCase'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function User(){


    const {user, signOut, userHistoric, loading} = useContext(AuthContext)


console.log(modifyName)

const semestreAtual = userHistoric[userHistoric.length - 1] 
const nomeCompletoAluno = user.name.split(' ') // pega o nome EM LETRA MAIUSCULA e particiona em array
const curso = semestreAtual.s_descricao.split('<')[0] // Separa o nome do curso da string criando uma array 'CURSO<br>EMEC'
const periodoAtual = semestreAtual.aperiodo.split(' ').join('') // Pega o "7 °" e remove o espaço

const modifyName = []

function verifyName(name){ // Função que percorre a array particionada acima, transforma as letras e adiciona em uma nova array

    name.map((index) => {

        if(index === 'DE' || index === 'DO' || index === 'DOS' || index === 'DA' || index === 'DAS' || index === 'E'){
            modifyName.push(index.toLowerCase())
        }
        else{
            const name = index[0].toUpperCase() + index.substring(1).toLowerCase() // Coloque o indice [0] da string MAIUSC... e pegue o restante (substring) à partir do índice 1 
            modifyName.push(name)
        }
    })  
}

const getModifiedName = () => {verifyName(nomeCompletoAluno)}
getModifiedName()

function getProfileName(){ // Função que verifica se o nome da pessoa tem "dos, de..." e retorna o nome com isso 
    if(modifyName[1] === 'de' || modifyName[1] === 'do' || modifyName[1] === 'dos' || modifyName[1] === 'da' || modifyName[1] === 'das' || modifyName[1] === 'e'){
        return `${modifyName[0]} ${modifyName[1]} ${modifyName[2]}`
    }
    return `${modifyName[0]} ${modifyName[1]}`
}

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                        <View style={styles.circleUser}></View>
                        <TextFont texto={<NomeSobrenomeAlternado name={user.name}/>} fontWeight={"bold"} fontSize={20} color={'white'}/>
                        <TextFont texto={loading ? 'Carregando...' : `${curso[0].toUpperCase() + curso.substring(1).toLowerCase()} / ${periodoAtual} Semestre`} fontWeight={"regular"} color={'white'}/>
                </View>   
                
            </View>

            <View style={styles.main}>

                 <View style={styles.boxAbsolute}>
                        <View style={styles.boxAbsoluteContainer}>
                            <View style={styles.boxAbsoluteTextContainer}>
                                <TextFont texto={"CH / CURSADA"} fontWeight={"regular"} fontSize={12} color={'white'}/>
                                <TextFont texto={"CH / TOTAL"} fontWeight={"regular"} fontSize={12} color={'white'}/>
                            </View>
                            <View style={styles.boxAbsoluteTextContainer}>

                                {semestreAtual.carga_horaria_cursada ? 
                                <TextFont texto={loading ? 'Carregando...' : semestreAtual.carga_horaria_cursada.split('.')[0]} fontWeight={"bold"} fontSize={20} color={'white'}/> : 
                                <TextFont texto={"0"} fontWeight={"bold"} fontSize={20} color={'white'}/>}

                                <TextFont texto={loading ? 'Carregando...' : semestreAtual.carga_horaria_curso} fontWeight={"bold"} fontSize={20} color={'white'}/>
                            </View>
                        </View>
                 </View>         

                <View style={styles.lowerMain}>
                    <View style={styles.boxUserInfoContainer}>
                        <View style={[styles.boxUserInfoRow, {marginBottom: 22}]}>
                            <TextFont texto={"INFORMAÇÕES DO USUÁRIO"} fontWeight={"semibold"} fontSize={12}/>
                        </View>
                        <View style={styles.boxUserInfo}>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"NOME"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={<NomeSobrenomeUpperCase name={user.name}/>} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CGA"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={user.id} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CURSO"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={loading ? 'Carregando...' : `${curso}`} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"SEMESTRE"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={loading ? 'Carregando...' : `${periodoAtual}`} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"E-MAIL"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={user.email} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonSair} onPress={() => {signOut()}}>
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}
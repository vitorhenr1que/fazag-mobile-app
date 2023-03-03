
import { useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function User(){


    const {user, signOut, userHistoric} = useContext(AuthContext)


console.log(modifyName)

const semestreAtual = userHistoric[userHistoric.length - 1]
const nomeCompletoAluno = semestreAtual.a_nome.split(' ')
const curso = semestreAtual.s_descricao.split('<')[0]
console.log(semestreAtual.aperiodo)

const modifyName = []

function verifyName(name){

    name.map((index) => {

        if(index === 'DE' || index === 'DO' || index === 'DOS' || index === 'DA' || index === 'DAS' || index === 'E'){
            modifyName.push(index.toLowerCase())
        }
        else{
            const breakName = index.split('')
            const firstLetter = breakName[0]
            const restOfName = breakName.splice(1).join('').toLowerCase()
            const name = firstLetter + restOfName
            modifyName.push(name)
        }
    })  
}

const ativar = () => {verifyName(nomeCompletoAluno)}
ativar()
console.log(modifyName)
console.log(user)

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                        <View style={styles.circleUser}></View>
                        <TextFont texto={`${modifyName[0]} ${modifyName[1]} ${modifyName[2]}`} fontWeight={"bold"} fontSize={20} color={'white'}/>
                        <TextFont texto={"Pedagogia / 7° Semestre"} fontWeight={"regular"} color={'white'}/>
                </View>            
            </View>

            <View style={styles.main}>
                <View style={styles.boxAbsolute}></View>
                <View style={styles.lowerMain}>
                    <View style={styles.boxUserInfoContainer}>
                        <View style={[styles.boxUserInfoRow, {marginBottom: 22}]}>
                            <TextFont texto={"INFORMAÇÕES DO USUÁRIO"} fontWeight={"semibold"} fontSize={12}/>
                        </View>
                        <View style={styles.boxUserInfo}>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"NOME"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={`${modifyName[0]} ${modifyName[1]} ${modifyName[2]}`} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CGA"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={user.id} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CURSO"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={`${curso}`} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"SEMESTRE"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={"1°"} fontWeight={"semibold"} fontSize={12}/>
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
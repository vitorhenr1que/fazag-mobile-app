
import {Inter_300Light, Inter_400Regular, Inter_700Bold, Inter_600SemiBold, useFonts} from '@expo-google-fonts/inter'
import { useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function User(){
    const {user, signOut, userHistoric} = useContext(AuthContext)


const semestreAtual = userHistoric[userHistoric.length - 1]



console.log(user)

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                        <View style={styles.circleUser}></View>
                        <TextFont texto={"Tailana Oliveira"} fontWeight={"bold"} fontSize={20} color={'white'}/>
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
                                <TextFont texto={"TAILANA OLIVEIRA"} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CGA"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={user.id} fontWeight={"semibold"} fontSize={12}/>
                            </View>
                            <View style={styles.boxUserInfoRow}>
                                <TextFont texto={"CURSO"} fontWeight={"semibold"} fontSize={12}/>
                                <TextFont texto={"PEDAGOGIA"} fontWeight={"semibold"} fontSize={12}/>
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
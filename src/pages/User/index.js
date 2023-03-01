
import { useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function User(){
    const {user, setUser, signOut} = useContext(AuthContext)


    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text>Bem vindo</Text>
                <Text>{user.email}</Text>
                <Text>Meu CGA:</Text>
                <Text>{user.id}</Text>
            </View>            
            <TouchableOpacity style={styles.buttonSair} onPress={() => {signOut()}}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}
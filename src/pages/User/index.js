
import { useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { nomeAluno } from '../../components/nomeAluno'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function User(){
    const {user, setUser, signOut} = useContext(AuthContext)

console.log(user)
    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
               
                <View style={styles.meuCga}>
                    <Text>Meu CGA:</Text>
                    <Text>{user.id}</Text>
                </View>
                
            </View>            
            <TouchableOpacity style={styles.buttonSair} onPress={() => {signOut()}}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}
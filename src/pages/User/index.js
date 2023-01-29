import { useContext } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../../contexts/auth'
export function User(){
    const {signed, user} = useContext(AuthContext)
    console.log(signed)
    return(
        <View>
            <Text>{`${signed} ${user.username}`}</Text>
        </View>
    )
}
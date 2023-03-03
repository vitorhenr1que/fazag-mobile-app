import { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AuthContext } from '../../contexts/auth'
export function MapaDeSala(){
    const { userHistoric } = useContext(AuthContext)
    return(
        <ScrollView>
            <Text>{JSON.stringify(userHistoric[userHistoric.length - 1])}</Text>
        </ScrollView>
    )
}
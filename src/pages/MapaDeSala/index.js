import { useContext } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AuthContext } from '../../contexts/auth'
export function MapaDeSala(){
    const { userHistoric, signOut } = useContext(AuthContext)
    return(
        <ScrollView>
            <Button onPress={() => signOut()} title={"Sair"}/>
            <Text>{JSON.stringify(userHistoric[userHistoric.length - 1])}</Text>
        </ScrollView>
    )
}
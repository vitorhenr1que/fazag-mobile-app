import { useContext } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
export function MapaDeSala(){
    const { userHistoric, signOut } = useContext(AuthContext)
    return(
        <ScrollView>

            {userHistoric.map((index) => {
                const periodo = index.periodo.trim()
                const periodoAtual = userHistoric[userHistoric.length - 1].periodo.trim()
                if(periodo === periodoAtual){
                   return <TextFont key={index.ds_id} texto={index.d_descricao.trim()}/>
                }
            })}
            <Button onPress={() => signOut()} title={"Sair"}/>
        </ScrollView>
    )
}
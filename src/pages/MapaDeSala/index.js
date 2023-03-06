import { useContext } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
import { Table, Row, Rows } from 'react-native-table-component'

export function MapaDeSala(){
    const { userHistoric, signOut } = useContext(AuthContext)

    const table = {
        tableHead: ['Disc1','Disc2','Disc3','Disc4','Disc5',],
        tableBody: [
            ['' , '', '', '', ''],
            
        ]
    }
    return(
        <ScrollView>

            {userHistoric.map((index) => {
                const periodo = index.periodo.trim()
                const periodoAtual = userHistoric[userHistoric.length - 1].periodo.trim()
                if(periodo === periodoAtual){
                   return <TextFont key={index.ds_id} texto={index.d_descricao.trim()}/>
                }
            })}
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={table.tableHead} style={styles.head}/>
                <Rows data={table.tableBody} style={styles.body} textStyle={styles.body} />
            </Table>
            <Text>text</Text>
            <Button onPress={() => signOut()} title={"Sair"}/>
        </ScrollView>
    )
}
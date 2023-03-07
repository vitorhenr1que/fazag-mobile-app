import { useContext, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
import { Table, Row, Rows, Cols, Col, TableWrapper } from 'react-native-table-component'
import { MapaTable } from '../../components/MapaDeSala/MapaTable'

export function MapaDeSala(){

    const [tableHead, setTableHead] = useState(['Segunda-Feira'])
    const [tableBody, setTableBody] = useState([])
    const { userHistoric, signOut } = useContext(AuthContext)

 

const daysOfWeek = {
    0: 'Segunda-Feira',
    1: 'Terça-Feira',
    2: 'Quarta-Feira',
    3: 'Quinta-Feira',
    4: 'Sexta-Feira',
    5: 'Sábado'
}

console.log(daysOfWeek[0])
let count = 0
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {userHistoric.map((index, position) => {
                const periodo = index.periodo.trim()
                const periodoAtual = userHistoric[userHistoric.length - 1].periodo.trim()
                
                if(periodo === periodoAtual){
                    
                    return <MapaTable key={position} disciplina={index.d_descricao} sala={index.procid} andar={'1°'} professor={index.professor} dia={daysOfWeek[count++]}/>
                    
                }
            })}
        </ScrollView>
    )
}
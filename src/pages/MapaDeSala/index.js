import { useContext, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
import { MapaTable } from '../../components/MapaDeSala/MapaTable'

export function MapaDeSala(){

    const [tableHead, setTableHead] = useState(['Segunda-Feira'])
    
    const { userHistoric, signOut } = useContext(AuthContext)

    let count = 0
    const weekDays = {
        "SEG": 0,
        "TER": 1,
        "QUA": 2,
        "QUI": 3,
        "SEX": 4,
        "SAB": 5
    }

    const mapaItems = []

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {userHistoric.map((index) => {
                const periodo = index.periodo.trim()
                const periodoAtual = userHistoric[userHistoric.length - 1].periodo.trim()
                
                if(periodo === periodoAtual){
                    try {
                        const sala = index.sala.split(' ').filter(nome => (nome))  // cria uma array ex: [TER, "19:00", "22:00", Auditório, Andar, 1°, 02]
                        mapaItems.push({
                            dia: weekDays[sala[0]], // recebe sala[0] dia da semana da api ex: "SEG"
                            disciplina: index.d_descricao, 
                            sala: sala[sala.length - 1],
                            andar: `${sala.length === 7 ? sala[sala.length - 3] + ' ' + sala[sala.length - 2] : sala[sala.length - 2]}`, //se tiver "num° andar" : se tiver térreo
                            professor: index.professor
                        })
                    } catch (e){
                        mapaItems.push({
                            dia: 'Dia não informado', 
                            disciplina: index.d_descricao, 
                            sala: '',
                            andar: '', //se tiver "num° andar" : se tiver térreo
                            professor: index.professor
                        })
                    }
  
                }
            })}
            {mapaItems.sort((a, b) => a.dia - b.dia).map((item, position) => {  // sort() ordena itens à partir de uma propriedade
            count++
                return <MapaTable key={count} dia={item.dia} disciplina={item.disciplina} andar={item.andar} professor={item.professor} sala={item.sala}/>
            })}
            
        </ScrollView>
    )
}
import { useContext, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextFont } from '../../components/Basics/TextFont'
import { AuthContext } from '../../contexts/auth'
import { styles } from './style'
import { MapaTable } from '../../components/MapaDeSala/MapaTable'

export function MapaDeSala(){

    
    const { signOut, loading, userHorario } = useContext(AuthContext)

    let count = 0
    const weekDays = {
        "SEG": 0,
        "TER": 1,
        "QUA": 2,
        "QUI": 3,
        "SEX": 4,
        "SAB": 5,
        "DOM": 6,
        "Dia não informado": 7
    }

    const mapaItems = []

    return ( 
        <>
     {!loading && 
        <ScrollView showsVerticalScrollIndicator={false} >

            {userHorario.map((index) => {
                

                    if(index.prds_nome !== null) {
                        const sala = index.prds_nome.trim()
                        const dia = weekDays[`${index.ph_dia.trim()}`]
                        const andar = index.prds_pavimento.trim()
                        mapaItems.push({
                            dia,
                            disciplina: index.d_descricao,
                            sala,
                            andar: andar,
                            professor: index.professor.toUpperCase()
                        })
                        return
                    } else{
                        mapaItems.push({
                            dia: weekDays["Dia não informado"], 
                            disciplina: index.d_descricao, 
                            sala: '',
                            andar: '', //se tiver "num° andar" : se tiver térreo
                            professor: index.professor
                        })
                        return
                    }
  
                
            })}
            {mapaItems.sort((a, b) => a.dia - b.dia).map((item, position) => {  // sort() ordena itens à partir de uma propriedade
            count++
                return <MapaTable key={count} dia={item.dia} disciplina={item.disciplina} andar={item.andar} professor={item.professor} sala={item.sala}/>
            })}
            
        </ScrollView>
    } 
    {loading && 
    <ScrollView showsVerticalScrollIndicator={false} >
            <MapaTable key={1} dia={7} disciplina={"Carregando..."} andar={"Carregando..."} professor={"Carregando..."} sala={"Carregando..."}/> 
    </ScrollView>
    }
    </>
    )
    



    
}
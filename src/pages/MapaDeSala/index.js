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

 
const daysOfWeek = []

console.log(daysOfWeek[0])
let count = 0
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {userHistoric.map((index, position) => {
                const periodo = index.periodo.trim()
                const periodoAtual = userHistoric[userHistoric.length - 1].periodo.trim()
                
                if(periodo === periodoAtual){
                    const sala = index.sala.split(' ').filter(nome => (nome))
                    if (sala[0] === "SEG"){
                        daysOfWeek.splice(0, 0, { // splice params = (posição_inicial, quantos itens tirar, item para adicionar)
                            day: "Segunda-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    if (sala[0] === "TER"){
                        daysOfWeek.splice(1, 0, {
                            day: "Terça-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    if (sala[0] === "QUA"){
                        daysOfWeek.splice(2, 0, {
                            day: "Quarta-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    if (sala[0] === "QUI"){
                        daysOfWeek.splice(3, 0, {
                            day: "Quarta-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    if (sala[0] === "SEX"){
                        daysOfWeek.splice(4, 0, {
                            day: "Sexta-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    if (sala[0] === "SAB"){
                        daysOfWeek.splice(5, 0, {
                            day: "Sábado-Feira",
                            disciplina: index.d_descricao,
                            sala: sala[sala.length - 1],
                            andar: sala[sala.length - 2],
                            professor: index.professor
                        })}
                    
                }
            })}
            {daysOfWeek.map((index) => {
                console.log(daysOfWeek)
                return <MapaTable key={index.disciplina} disciplina={index.disciplina} andar={index.andar} dia={index.day} professor={index.professor} sala={index.sala}/>
            })}
        </ScrollView>
    )
}
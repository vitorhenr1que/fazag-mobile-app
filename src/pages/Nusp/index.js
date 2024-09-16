import {styles} from './style'
import { useContext, useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextFont } from "../../components/Basics/TextFont";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

export function Nusp(){

    const [daySelected, setDaySelected] = useState('')
    const [isSelected, setIsSelected] = useState('')
    const [horario, setHorario] = useState('')
    const [testArr, setTestArr] = useState([
        {createdAt: "String",
        email: "String",
        horario: "String",
        id: "String",
        nome: "String",
        vinculo: "String"}
    ])
    const [toggleHour, setToggleHour] = useState(false)
    const [selectedHour, setSelectedHour] = useState(0)

    const { user } = useContext(AuthContext)
    console.log(selectedHour)
    async function handleSubmit(){
        console.log('Entrou na função')
        try {
            await api.post('/nusp/create', {
              nome: user.name,
              email: user.email,
              horario: String(selectedHour),
              vinculo: 'Aluno',
              dataAgendada: String(daySelected)
            })

            await api.post('/nusp/nodemailer', {
              nome: user.name,
              email: user.email,
              horario: String(selectedHour),
              text: 'Agendamento pelo aplicativo',
              vinculo: 'Aluno',
              dataAgendada: String(daySelected)
            }) } catch(e){
                alert('Ocorreu um erro! Código: ', e.message)
            }
            alert('Sessão Agendada!')
    }

    function verifyHour(hour){
        const test = !!testArr.filter((index) => index.horario.includes(hour))[0]
        return test
    }
    const renderDay = (day) => {
        const dayOfWeek = new Date(day.dateString).getDay()
        const habilitedDays = dayOfWeek === 0 // para mais dias || dayOfWeek === 2
        
        function handleDayPress(day){
            const dia = String(day.day).length === 1 ? String(day.day).padStart(2, '0'): day.day
            const mes = String(day.month).length === 1 ? String(day.month).padStart(2, '0') : day.month // O método padStart(2, '0') adiciona um 0 à esquerda até que a string tenha pelo menos 2 caracteres.
            const ano = day.year
            setIsSelected(day.dateString)
            return setDaySelected(`${dia}/${mes}/${ano}`)
        }
        
        return (
            <TouchableOpacity disabled={!habilitedDays} onPress={() => handleDayPress(day)}>
              <View style={{ 
                padding: 10, 
                backgroundColor: day.dateString === isSelected ? 'orange': 'white',
                borderRadius: 50,
                opacity: habilitedDays ? 1 : 0.3, // Se não for segunda, diminui a opacidade
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: habilitedDays ? 'black' : 'gray' }}>{`${String(day.day).padStart(2, '0')}`}</Text>
              </View>
            </TouchableOpacity>
          )
    }

    function handleClickHour(hour){
        setSelectedHour(hour)
    }
  
        useEffect(() => {
            async function VerifyDateHour(){
                
                try{
                  const response = await api.post('/nusp/find', {
                    dataAgendada: daySelected
                  })
                  
                  setTestArr(response.data)
  
                }catch(e){
                  console.log(e, 'Erro na verificação de agendamento')
                }
                
  
               
              }
              setToggleHour(true)
              verifyHour(21)
              VerifyDateHour()
              setHorario("")
              
        }, [daySelected])

        LocaleConfig.locales['pt-br'] = {
            monthNames: [
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            today: 'Hoje'
          };

          LocaleConfig.defaultLocale = 'pt-br'
   
    return (
        <ScrollView>
            <View style={{padding: 20}}>
                <TextFont texto={"Escolha a data da sua sessão"} fontSize={20} textAlign={"center"}/>
            </View>
            <Calendar 
            onDayPress={day => console.log(day)}
            dayComponent={({date}) => renderDay(date)}
            //markedDates={{['2024-09-23']: {selected: true, disableTouchEvent: true, selectedColor: 'orange'} }}
            />
            <View style={[styles.container, isSelected ? {display: 'flex'} : {display: 'none'}]}>
                <TextFont texto={"Selecione o Horário"} fontSize={20}/>

                { //Condicional se já estiver horário as 19h
                verifyHour(19) ?  <TouchableOpacity 
                style={[styles.touchableContainer, {backgroundColor: "#e0e0e0", color: "#bdbabb"}] } 
                onPress={() => handleClickHour(19)}
                disabled={true}
                >
                    <TextFont texto={"19:00"} color={"#a4a1a2"} fontSize={16}/>
                </TouchableOpacity> 
                : 
                <TouchableOpacity // Se não estiver horário as 19h
                style={[styles.touchableContainer, selectedHour === 19 ? {backgroundColor: "#00527C"} : {backgroundColor: "#4E97D1"}] } 
                onPress={() => handleClickHour(19)}
                >
                    <TextFont texto={"19:00"} color={"white"} fontSize={16}/>
                </TouchableOpacity>
                }

                { //Condicional se já estiver horário as 20h
                verifyHour(20) ?  <TouchableOpacity 
                style={[styles.touchableContainer, {backgroundColor: "#e0e0e0", color: "#bdbabb"}] } 
                onPress={() => handleClickHour(20)}
                disabled={true}
                >
                    <TextFont texto={"20:00"} color={"#a4a1a2"} fontSize={16}/>
                </TouchableOpacity> 
                : 
                <TouchableOpacity // Se não estiver horário as 20h
                style={[styles.touchableContainer, selectedHour === 20 ? {backgroundColor: "#00527C"} : {backgroundColor: "#4E97D1"}] } 
                onPress={() => handleClickHour(20)}
                >
                    <TextFont texto={"20:00"} color={"white"} fontSize={16}/>
                </TouchableOpacity>
                }

                { //Condicional se já estiver horário as 21h
                verifyHour(21) ?  <TouchableOpacity 
                style={[styles.touchableContainer, {backgroundColor: "#e0e0e0", color: "#bdbabb"}] } 
                onPress={() => handleClickHour(21)}
                disabled={true}
                >
                    <TextFont texto={"21:00"} color={"#a4a1a2"} fontSize={16}/>
                </TouchableOpacity> 
                : 
                <TouchableOpacity // Se não estiver horário as 21h
                style={[styles.touchableContainer, selectedHour === 21 ? {backgroundColor: "#00527C"} : {backgroundColor: "#4E97D1"}] } 
                onPress={() => handleClickHour(21)}
                >
                    <TextFont texto={"21:00"} color={"white"} fontSize={16}/>
                </TouchableOpacity>
                }
            </View>
            <View style={[styles.submitContainer, !!selectedHour ? {display: 'flex'} : {display: 'none'}]}>
                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                    <TextFont texto={"Agendar"} textAlign={'center'} fontSize={16}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
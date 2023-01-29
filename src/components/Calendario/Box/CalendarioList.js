import { FlatList, View, VirtualizedList } from "react-native"
import { BoxDate } from "."

export function CalendarioList(){

    const calendario = [
        {
            0: [ {   //Janeiro (Apagar somente os objetos de dentro da array)
                dia_do_mes: 28,
                status: 'letivo',
                text: 'Jornada Pedagógica'
            },
            {
                dia_do_mes: 29,
                status: 'letivo',
                text: 'Jornada Pedagógica'
            },
            {
                dia_do_mes: 30,
                status: 'letivo',
                text: 'Jornada Pedagógica'
            },
            {
                dia_do_mes: 31,
                status: 'letivo',
                text: 'Jornada Pedagógica'
            }]

        },
        
        {   
            1:[ { //Fevereiro
                "dia_do_mes": 6,
                "status": "atencao",
                "text": "Início do Semestre Letivo"
              },
              {
                "dia_do_mes": 11,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 25,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 17,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 18,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 19,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 20,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 21,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 22,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 23,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 24,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 25,
                "status": "recesso",
                "text": "Recesso de Carnaval"
              },
              {
                "dia_do_mes": 28,
                "status": "reuniao",
                "text": "Reunião Coordenação de Curso"
              }]
        },

        {   
            2: [ // Março
            {
                "dia_do_mes": 2,
                "status": "normal",
                "text": "Dia Nacional do Turismo"
              },
              {
                "dia_do_mes": 4,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 8,
                "status": "letivo",
                "text": "Dia Internacional da Mulher"
              },
              {
                "dia_do_mes": 11,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 12,
                "status": "normal",
                "text": "Dia do Bibliotecário"
              },
              {
                "dia_do_mes": 13,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 14,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 15,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 16,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 17,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 18,
                "status": "normal",
                "text": "Período de Realização dos Trabalhos de AV1"
              },
              {
                "dia_do_mes": 18,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 22,
                "status": "reuniao",
                "text": "Reunião de NDE de todos os cursos"
              },
              {
                "dia_do_mes": 22,
                "status": "atencao",
                "text": "Matrícula de estágio (ultimo dia)"
              },
              {
                "dia_do_mes": 22,
                "status": "atencao",
                "text": "Último dia para matrícula, trancamento, isenção e trancamento de disciplinas"
              },
              {
                "dia_do_mes": 28,
                "status": "reuniao",
                "text": "Reunião dos Colegiados de Cursos"
              },
              {
                "dia_do_mes": 15,
                "status": "colacao",
                "text": "Colação de Grau sem solenidade para todos os cursos"
              },
              {
                "dia_do_mes": 30,
                "status": "reuniao",
                "text": "Reunião do CONSUPA"
              },
              {
                "dia_do_mes": 25,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 30,
                "status": "reuniao",
                "text": "Reunião com os Líderes de Turma"
              },
            ]
        },

        {   
            3: [ // Abril
            {
                "dia_do_mes": 4,
                "status": "normal",
                "text": "Dia Mundial da Saúde"
              },
              {
                "dia_do_mes": 7,
                "status": "recesso",
                "text": "Recesso de Sexta-Feira Santa"
              },
              {
                "dia_do_mes": 8,
                "status": "recesso",
                "text": "Recesso de Sexta-Feira Santa"
              },
              {
                "dia_do_mes": 9,
                "status": "recesso",
                "text": "Páscoa"
              },
              {
                "dia_do_mes": 10,
                "status": "normal",
                "text": "Dia do Engenheiro Civil"
              },
              {
                "dia_do_mes": 15,
                "status": "letivo",
                "text": "Sábado Letivo"
              },
              {
                "dia_do_mes": 19,
                "status": "reuniao",
                "text": "Reunião Coordenação de Curso"
              },
              {
                "dia_do_mes": 21,
                "status": "recesso",
                "text": "Feriado Tiradentes"
              },
              {
                "dia_do_mes": 22,
                "status": "recesso",
                "text": "Feriado Tiradentes"
              },
              {
                "dia_do_mes": 22,
                "status": "colacao",
                "text": "Aniversário da FAZAG"
              },
              {
                "dia_do_mes": 24,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 25,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 25,
                "status": "normal",
                "text": "Dia do Contabilista"
              },
              {
                "dia_do_mes": 26,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 27,
                "status": "reuniao",
                "text": "Reunião do Colegiado de Cursos"
              },
              {
                "dia_do_mes": 27,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 28,
                "status": "normal",
                "text": "Dia da Educação"
              },
              {
                "dia_do_mes": 28,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 29,
                "status": "normal",
                "text": "Período de Provas AVI"
              },
              {
                "dia_do_mes": 29,
                "status": "letivo",
                "text": "Sábado Letivo"
              }
            ]
        },

        {   
            4: [ // Maio
                {}
            ]
        },

        {   
            5: [ // Junho
                {}
            ]
        },

        {   
            6: [ // Julho
                {}
            ]
        },

        {   
            7: [ // Agosto
                {}
            ]
        },

        {   
            8: [ // Setembro
                {}
            ]
        },
            
        {   
            9: [ // Outubro
                {}
            ]
        },
            
        {   
            10: [ // Novembro
                {}
            ]
        },
            
        {   
            11: [ // Dezembro
                {}
            ]
        },
        

    ]
    const mesAtual = new Date().getMonth()

    return (
        <View>
        {calendario.map((item, index) => {
            if(index >= mesAtual){
                return <BoxDate key={index} month={item[index]} idMonth={index}/>
            }else {
                return;
            }
        })}
        </View>
    )
}
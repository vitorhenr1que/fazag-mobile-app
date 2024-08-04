import { FlatList, View, VirtualizedList } from "react-native"
import { BoxDate } from "."

export function CalendarioList(){

    const calendario = [
        {
            0: [ {   //Janeiro (Apagar somente os objetos de dentro da array)
                dia_do_mes: 1,
                status: 'recesso',
                text: 'Feriado Nacional (Confraternização Universal)'
            },
            {
                dia_do_mes: 18,
                status: 'normal',
                text: 'Dia do Esteticista'
            },
            {
                dia_do_mes: 20,
                status: 'reuniao',
                text: 'Jornada Pedagógica'
            },]

        },
        
        {   // Fevereiro
            1:[ {
              "dia_do_mes": 5,
              "status": "atencao",
              "text": "Inicío do Semestre Letivo"
            },
            {
              "dia_do_mes": 8,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 9,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 10,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 11,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 12,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 13,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 14,
              "status": "recesso",
              "text": "Recesso de Carnaval"
            },
            {
              "dia_do_mes": 17,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 24,
              "status": "letivo",
              "text": "Sábado Letivo"
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
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 8,
              "status": "normal",
              "text": "Dia Internacional da Mulher"
            },
            {
              "dia_do_mes": 9,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 12,
              "status": "normal",
              "text": "Dia do Bibliotecário"
            },
            {
              "dia_do_mes": 16,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 16,
              "status": "reuniao",
              "text": "Matrícula de Estágio (Último dia)"
            },
            {
              "dia_do_mes": 16,
              "status": "reuniao",
              "text": "Último dia para matrícula, trancamento, insenção e trancamento de disciplinas"
            },
            {
              "dia_do_mes": 18,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
            },
            {
              "dia_do_mes": 19,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
            },
            {
              "dia_do_mes": 20,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
            },
            {
              "dia_do_mes": 21,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
            },
            {
              "dia_do_mes": 22,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
            },
            {
              "dia_do_mes": 23,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV1"
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
              "dia_do_mes": 6,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 10,
              "status": "normal",
              "text": "Dia do Engenheiro Civil"
            },
            {
              "dia_do_mes": 13,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 19,
              "status": "reuniao",
              "text": "Reunião Coordenação de Curso"
            },
            {
              "dia_do_mes": 20,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 21,
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
              "status": "reuniao",
              "text": "Reunião do Colegiado de Cursos"
            },
            {
              "dia_do_mes": 25,
              "status": "normal",
              "text": "Dia do Contabilista"
            },
            {
              "dia_do_mes": 22,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 23,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 24,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 25,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 26,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 27,
              "status": "normal",
              "text": "Período de Provas de AV 1"
            },
            {
              "dia_do_mes": 27,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 28,
              "status": "normal",
              "text": "Dia da Educação"
            }
            ]
        },

        {   
            4: [ // Maio
            {
              "dia_do_mes": 1,
              "status": "recesso",
              "text": "Feriado Dia do Trabalho"
            },
            {
              "dia_do_mes": 3,
              "status": "normal",
              "text": "Último prazo para solicitações de Provas Substitutivas de AV I"
            },
            {
              "dia_do_mes": 4,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 6,
              "status": "normal",
              "text": "Professores devem lançar os resultados da AV1 no Portal do Aluno"
            },
            {
              "dia_do_mes": 11,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 12,
              "status": "normal",
              "text": "Dia do Enfermeiro / Dia das Mães"
            },
            {
              "dia_do_mes": 15,
              "status": "normal",
              "text": "Dia do Assistente Social"
            },
            {
              "dia_do_mes": 20,
              "status": "normal",
              "text": "Dia do Pedagogo"
            },
            {
              "dia_do_mes": 20,
              "status": "reuniao",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 21,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 22,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 23,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 24,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 25,
              "status": "normal",
              "text": "Período de Realização dos Trabalhos de AV2"
            },
            {
              "dia_do_mes": 25,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 27,
              "status": "reuniao",
              "text": "Reunião do Colegiado de Cursos"
            },
            {
              "dia_do_mes": 30,
              "status": "recesso",
              "text": "Feriado Corpus Christi"
            },
            {
              "dia_do_mes": 31,
              "status": "recesso",
              "text": "Feriado Corpus Christi"
            },
            {
              "dia_do_mes": 31,
              "status": "reuniao",
              "text": "Reunião do ISE"
            }
            ]
        },

        {   
            5: [ // Junho
            {
              "dia_do_mes": 1,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 3,
              "status": "normal",
              "text": "Apresentação de Todos os Trabalhos de Conclusão de Curso"
            },
            {
              "dia_do_mes": 4,
              "status": "normal",
              "text": "Apresentação de Todos os Trabalhos de Conclusão de Curso"
            },
            {
              "dia_do_mes": 5,
              "status": "normal",
              "text": "Apresentação de Todos os Trabalhos de Conclusão de Curso"
            },
            {
              "dia_do_mes": 6,
              "status": "reuniao",
              "text": "Reunião Coordenação de Curso"
            },
            {
              "dia_do_mes": 8,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 10,
              "status": "normal",
              "text": "Dia da Lingua Portuguesa"
            },
            {
              "dia_do_mes": 10,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 11,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 12,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 13,
              "status": "reuniao",
              "text": "Reunião do Colegiado de Cursos"
            },
            {
              "dia_do_mes": 13,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 14,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 15,
              "status": "letivo",
              "text": "Sábado Letivo"
            },
            {
              "dia_do_mes": 15,
              "status": "normal",
              "text": "Período de Provas Individuais de AVII"
            },
            {
              "dia_do_mes": 17,
              "status": "normal",
              "text": "Último prazo para solicitação de Provas Substitutivas de AVII"
            },
            {
              "dia_do_mes": 17,
              "status": "normal",
              "text": "Provas Finais"
            },
            {
              "dia_do_mes": 18,
              "status": "normal",
              "text": "Provas Finais"
            },
            {
              "dia_do_mes": 19,
              "status": "normal",
              "text": "Provas Finais"
            },
            {
              "dia_do_mes": 20,
              "status": "normal",
              "text": "Provas Finais"
            },
            {
              "dia_do_mes": 21,
              "status": "normal",
              "text": "Provas Finais"
            },
            {
              "dia_do_mes": 22,
              "status": "recesso",
              "text": "Recesso Junino"
            },
            {
              "dia_do_mes": 23,
              "status": "recesso",
              "text": "Recesso Junino"
            },
            {
              "dia_do_mes": 24,
              "status": "recesso",
              "text": "Recesso Junino"
            },
            {
              "dia_do_mes": 28,
              "status": "normal",
              "text": "Último dia Letivo / Professores deve lançar os resultados da AV2 no Portal do Aluno"
            }
            ]
        },

        {   
            6: [ // Julho
            {
              "dia_do_mes": "02",
              "status": "recesso",
              "text": "Feriado Independência da Bahia"
            },
            {
              "dia_do_mes": "03",
              "status": "Normal",
              "text": "Prazo Final para os professores lançarem as notas no Portal de 03 a 31"
            },
            {
              "dia_do_mes": "27",
              "status": "Normal",
              "text": "Jornada Pedagógica"
            }
            ]
        },

        {   
            7: [ // Agosto
            {
              "dia_do_mes": "05",
              "status": "normal",
              "text": "Início do Semestre Letivo"
            },
            {
              "dia_do_mes": "10",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "11",
              "status": "normal",
              "text": "Dia do Estudante / Dia dos Pais"
            },
            {
              "dia_do_mes": "14",
              "status": "reuniao",
              "text": "Reunião dos Colegiados de Cursos"
            },
            {
              "dia_do_mes": "17",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "24",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "26",
              "status": "normal",
              "text": "Períodos dos Trabalhos em grupo de AV 1 de 26 a 31"
            },
            {
              "dia_do_mes": "27",
              "status": "normal",
              "text": "Dia do Psicológo"
            },
            {
              "dia_do_mes": "28",
              "status": "reuniao",
              "text": "Reunião CONSUPA"
            },
            {
              "dia_do_mes": "31",
              "status": "normal",
              "text": "Dia do Nutricionista"
            }
            ]
        },

        {   
            8: [ // Setembro
            {
              "dia_do_mes": "01",
              "status": "normal",
              "text": "Dia do Profissional de Educação Física"
            },
            {
              "dia_do_mes": "06",
              "status": "reuniao",
              "text": "Reunião do Colegiado"
            },
            {
              "dia_do_mes": "07",
              "status": "recesso",
              "text": "Feriado Independência do Brasil"
            },
            {
              "dia_do_mes": "09",
              "status": "normal",
              "text": "Dia do Administrador"
            },
            {
              "dia_do_mes": "13",
              "status": "normal",
              "text": "Último dia para matrícula acadêmica, trancamento, isenção e trancamento de disciplina ( Atenção 25% das Faltas)"
            },
            {
              "dia_do_mes": "14",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "21",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "22",
              "status": "normal",
              "text": "Dia do Contador"
            },
            {
              "dia_do_mes": "23",
              "status": "normal",
              "text": "Períodos de provas individuais escritas de AV 1 de 23 a 28"
            },
            {
              "dia_do_mes": "23",
              "status": "reuniao",
              "text": "Reunião dos NDEs de todos os cursos"
            },
            {
              "dia_do_mes": "26",
              "status": "normal",
              "text": "Dia do Farmacêutico"
            },
            {
              "dia_do_mes": "30",
              "status": "normal",
              "text": "Professores devem lançar os resultados da AV 1 no Phortal do Aluno/ Dia da Secretária"
            },
            {
              "dia_do_mes": "30",
              "status": "normal",
              "text": "Ultimo dia para solicitação de prova substitutiva AV 1"
            }
            ]
        },
            
        {   
            9: [ // Outubro
            {
              "dia_do_mes": "05",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "12",
              "status": "recesso",
              "text": "Feriado Nossa Senhora Aparecida"
            },
            {
              "dia_do_mes": "13",
              "status": "normal",
              "text": "Dia do Fisioterapeuta"
            },
            {
              "dia_do_mes": "15",
              "status": "normal",
              "text": "Dia do Professor"
            },
            {
              "dia_do_mes": "19",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "25",
              "status": "reuniao",
              "text": "Reunião de Colegiado"
            },
            {
              "dia_do_mes": "26",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "28",
              "status": "normal",
              "text": "Semana de Iniciação Cientifica – SICFAZ 2024 de 28 a 30"
            }
            ]
        },
            
        {   
            10: [ // Novembro
            {
              "dia_do_mes": "02",
              "status": "recesso",
              "text": "Feriado Finados"
            },
            {
              "dia_do_mes": "08",
              "status": "recesso",
              "text": "Recesso Feriados Municipais- Recesso Acadêmico"
            },
            {
              "dia_do_mes": "09",
              "status": "recesso",
              "text": "Recesso Feriados Municipais- Recesso Acadêmico"
            },
            {
              "dia_do_mes": "11",
              "status": "normal",
              "text": "Períodos dos Trabalhos em grupo de AV 2 de 11 a 16"
            },
            {
              "dia_do_mes": "14",
              "status": "reunião",
              "text": "Reunião de Colegiado"
            },
            {
              "dia_do_mes": "15",
              "status": "recesso",
              "text": "Recesso Feriado Proclamação da República"
            },
            {
              "dia_do_mes": "16",
              "status": "recesso",
              "text": "Recesso Feriado Proclamação da República"
            },
            {
              "dia_do_mes": "20",
              "status": "recesso",
              "text": "Feriado – Consciência Negra"
            },
            {
              "dia_do_mes": "23",
              "status": "letivo",
              "text": "Sábado letivo"
            },
            {
              "dia_do_mes": "25",
              "status": "normal",
              "text": "Apresentação do TCC de todos os cursos 25 a 28"
            },
            {
              "dia_do_mes": "27",
              "status": "colacao",
              "text": "Colação de grau sem solenidade de todos os cursos"
            },
            {
              "dia_do_mes": "28",
              "status": "normal",
              "text": "Períodos de Avaliação da IES pela CPA"
            },
            {
              "dia_do_mes": "30",
              "status": "letivo",
              "text": "Sábado letivo"
            }
            ]
        },
            
        {   
            11: [ // Dezembro
            {
              "dia_do_mes": "02",
              "status": "normal",
              "text": "Períodos de provas individuais escritas de AV 2 de 02 a 07"
            },
            {
              "dia_do_mes": "09",
              "status": "normal",
              "text": "Ùltimo dia para solicitação de prova substitutiva AV 2"
            },
            {
              "dia_do_mes": "16",
              "status": "normal",
              "text": "Período de Provas Finais de 16 a 21"
            },
            {
              "dia_do_mes": "18",
              "status": "normal",
              "text": "Professores devem lançar os resultados da AV 2 no Portal do Aluno"
            },
            {
              "dia_do_mes": "21",
              "status": "letivo",
              "text": "Último dia Letivo"
            },
            {
              "dia_do_mes": "23",
              "status": "recesso",
              "text": "Recesso Natal de 23 a 25"
            },
            {
              "dia_do_mes": "30",
              "status": "recesso",
              "text": "Recesso Ano Novo de 30 a 01/01"
            }
            ]
        },
        

    ]
    const mesAtual = new Date().getMonth()

    return (
        <View>
        {calendario.map((item, index) => {
            if(index >= mesAtual && index <= 5){
                return <BoxDate key={index} month={item[index]} idMonth={index}/>
            }else if(mesAtual > 5 && index >= mesAtual && index >= 5) {
                return <BoxDate key={index} month={item[index]} idMonth={index}/>
            }else {
              return;
            }
        })}
        </View>
    )
}
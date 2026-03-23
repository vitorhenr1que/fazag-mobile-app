import { FlatList, View, VirtualizedList } from "react-native"
import { BoxDate } from "."

export function CalendarioList(){

  const calendario = [
  { // Janeiro
    0: [
      { dia_do_mes: 1,  status: 'recesso', text: 'Recesso - Confraternização Universal' },
      { dia_do_mes: 2,  status: 'recesso', text: 'Recesso - Confraternização Universal' },
      { dia_do_mes: 3,  status: 'recesso', text: 'Recesso - Confraternização Universal' },
      { dia_do_mes: 5,  status: 'atencao', text: 'Período de Matrículas Aluno Veterano (05 a 31)' },
      { dia_do_mes: 5,  status: 'normal',  text: 'Matrícula Estágio todos os cursos (05 a 31)' },
      { dia_do_mes: 18, status: 'normal',  text: 'Dia do Esteticista' },
      { dia_do_mes: 24, status: 'reuniao', text: 'Jornada Pedagógica' },
    ],
  },

  { // Fevereiro
    1: [
      { dia_do_mes: 3,  status: 'atencao', text: 'Início do Semestre Letivo' },
      { dia_do_mes: 12, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 13, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 14, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 15, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 16, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 17, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 18, status: 'recesso', text: 'Recesso de Carnaval' },
      { dia_do_mes: 21, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 26, status: 'reuniao', text: 'Reunião de Colegiado de Curso' },
      { dia_do_mes: 28, status: 'letivo',  text: 'Sábado Letivo' },
    ],
  },

  { // Março
    2: [
      { dia_do_mes: 7,  status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 8,  status: 'normal',  text: 'Dia Internacional da Mulher' },
      { dia_do_mes: 12, status: 'normal',  text: 'Dia do Bibliotecário' },
      { dia_do_mes: 14, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 16, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 17, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 18, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 19, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 20, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 21, status: 'normal',  text: 'Período de Realização dos Trabalhos de AV1' },
      { dia_do_mes: 21, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 25, status: 'colacao', text: 'Colação de Grau sem solenidade para todos os cursos' },
      { dia_do_mes: 25, status: 'reuniao', text: 'Reunião de NDE de todos os cursos' },
      { dia_do_mes: 28, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 30, status: 'atencao', text: 'Último dia para matrícula, trancamento, isenção e trancamento de disciplinas. Atenção 25% das faltas' },
    ],
  },

  { // Abril
    3: [
      { dia_do_mes: 3,  status: 'recesso', text: 'Recesso Sexta Santa' },
      { dia_do_mes: 4,  status: 'recesso', text: 'Recesso Sexta Santa' },
      { dia_do_mes: 4,  status: 'normal',  text: 'Dia Mundial da Saúde' },
      { dia_do_mes: 5,  status: 'normal',  text: 'Páscoa' },
      { dia_do_mes: 10, status: 'normal',  text: 'Dia do Engenheiro Civil' },
      { dia_do_mes: 11, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 13, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 14, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 15, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 16, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 17, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 18, status: 'normal',  text: 'Período de envio de certificados de atividades complementares para Coordenações de Cursos' },
      { dia_do_mes: 18, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 20, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 21, status: 'recesso', text: 'Feriado Tiradentes' },
      { dia_do_mes: 21, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 22, status: 'colacao', text: 'Aniversário da FAZAG' },
      { dia_do_mes: 22, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 23, status: 'reuniao', text: 'Reunião de Colegiado de Curso' },
      { dia_do_mes: 23, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 24, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 25, status: 'normal',  text: 'Dia do Contabilista' },
      { dia_do_mes: 25, status: 'normal',  text: 'Período de Provas Individuais Escritas de AV1' },
      { dia_do_mes: 25, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 28, status: 'normal',  text: 'Dia da Educação' },
    ],
  },

  { // Maio
    4: [
      { dia_do_mes: 1,  status: 'recesso', text: 'Recesso Feriado Dia do Trabalho' },
      { dia_do_mes: 6,  status: 'atencao', text: 'Último prazo para solicitação de Provas Substitutivas de AV I' },
      { dia_do_mes: 9,  status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 10, status: 'normal',  text: 'Dia das Mães' },
      { dia_do_mes: 12, status: 'normal',  text: 'Dia do Enfermeiro' },
      { dia_do_mes: 15, status: 'normal',  text: 'Dia do Assistente Social' },
      { dia_do_mes: 16, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 18, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 19, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 20, status: 'normal',  text: 'Dia do Pedagogo' },
      { dia_do_mes: 20, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 21, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 22, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 23, status: 'normal',  text: 'Período de Trabalhos de AV II' },
      { dia_do_mes: 23, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 28, status: 'reuniao', text: 'Reunião de Colegiado de Curso' },
      { dia_do_mes: 30, status: 'letivo',  text: 'Sábado Letivo' },
    ],
  },

  { // Junho
    5: [
      { dia_do_mes: 4,  status: 'recesso', text: 'Recesso Corpus Christi' },
      { dia_do_mes: 5,  status: 'recesso', text: 'Recesso Corpus Christi' },
      { dia_do_mes: 6,  status: 'recesso', text: 'Recesso Corpus Christi' },
      { dia_do_mes: 8,  status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 9,  status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 10, status: 'normal',  text: 'Dia da Língua Portuguesa' },
      { dia_do_mes: 10, status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 11, status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 12, status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 13, status: 'letivo',  text: 'Sábado Letivo' },
      { dia_do_mes: 13, status: 'normal',  text: 'Período de Provas Individuais de AV II' },
      { dia_do_mes: 15, status: 'atencao', text: 'Último prazo para solicitação de Provas Substitutivas de AV II' },
      { dia_do_mes: 15, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 16, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 17, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 18, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 19, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 20, status: 'normal',  text: 'Período de Provas Finais' },
      { dia_do_mes: 22, status: 'atencao', text: 'Último dia Letivo / Professores devem lançar os resultados da AV2 no Portal do Aluno' },
      { dia_do_mes: 23, status: 'recesso', text: 'Recesso Junino' },
      { dia_do_mes: 24, status: 'recesso', text: 'Recesso Junino' },
    ],
  },
];
    const mesAtual = new Date().getMonth()

    return (
        <View>
        {calendario.map((item, index) => {
            // Mostra apenas meses a partir do atual
            if(index >= mesAtual) {
                // O item é um objeto com a chave sendo o índice do mês
                const events = item[index];
                if (events) {
                    return <BoxDate key={index} month={events} idMonth={index}/>
                }
            }
            return null;
        })}
        </View>
    )
}
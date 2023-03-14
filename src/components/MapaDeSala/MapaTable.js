import { Table, Row, TableWrapper, Cell } from 'react-native-table-component'
import { styles } from './style'

export function MapaTable({disciplina, sala, andar, professor, dia}){

        const diaSemana = {
                0: "Segunda-Feira",
                1: "Terça-Feira",
                2: "Quarta-Feira",
                3: "Quinta-Feira",
                4: "Sexta-Feira",
                5: "Sábado"
            }

   return (
    <Table style={{}} borderStyle={styles.border}>
    <Row textStyle={styles.textHead} data={[diaSemana[dia]]} style={styles.head}/>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Disciplina'} style={styles.cell}  />
            <Cell data={disciplina} style={styles.cell} />
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Sala'} style={styles.cell} />
            <Cell data={sala} style={styles.cell} />
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Andar'} style={styles.cell} />
            <Cell data={andar} style={styles.cell} />
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Professor'} style={styles.cell} />
            <Cell data={professor} style={styles.cell} />
    </TableWrapper>

    
</Table>
   )
}
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component'
import { styles } from './style'

export function MapaTable({disciplina, sala, andar, professor, dia}){
   return (
    <Table style={{}} borderStyle={styles.border}>
    <Row textStyle={styles.textHead} data={[dia]} style={styles.head}/>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Disciplina'} style={styles.cell}/>
            <Cell data={disciplina} style={styles.cell}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Sala'} style={styles.cell}/>
            <Cell data={sala} style={styles.cell}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Andar'} style={styles.cell}/>
            <Cell data={andar} style={styles.cell}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={'Professor'} style={styles.cell}/>
            <Cell data={professor} style={styles.cell}/>
    </TableWrapper>

    
</Table>
   )
}
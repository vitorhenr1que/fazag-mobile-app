import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component'
import { styles } from './style'

export function MapaTable({disciplina, sala, andar, professor, dia}){
   return (
    <Table style={{}} borderStyle={styles.border}>
    <Row textStyle={styles.textHead} data={[dia]} style={styles.head}/>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={[['Disciplina']]} style={styles.body} textStyle={styles.textBody}/>
            <Cell data={[[disciplina]]} style={styles.body} textStyle={styles.textBody}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={[['Sala']]} style={styles.body} textStyle={styles.textBody}/>
            <Cell data={[[sala]]} style={styles.body} textStyle={styles.textBody}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={[['Andar']]} style={styles.body} textStyle={styles.textBody}/>
            <Cell data={[[andar]]} style={styles.body} textStyle={styles.textBody}/>
    </TableWrapper>
    <TableWrapper style={{flexDirection: 'row'}}>
            <Cell data={[['Professor']]} style={styles.body} textStyle={styles.textBody}/>
            <Cell data={[[professor]]} style={styles.body} textStyle={styles.textBody}/>
    </TableWrapper>
    
    
</Table>
   )
}
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component'
import { styles } from './style'

export function MapaTable({disciplina, sala, andar, professor, dia}){
   return (
    <Table borderStyle={styles.border}>
    <Row textStyle={styles.textHead} data={[dia]} style={styles.head}/>
    <TableWrapper>
        <Rows data={[
            ['Disciplina', disciplina],
            ['Sala', sala],
            ['Andar', andar],
            ['Professor', professor]
            ]} style={styles.body} textStyle={styles.textBody} />
    </TableWrapper>
    
    
</Table>
   )
}
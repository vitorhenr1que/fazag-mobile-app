import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import {Picker} from '@react-native-picker/picker';
import {styles} from './style'

export function ModalOuvidoriaMotivo({fecharModal, motivo, setMotivo}){
    return (
        <View style={styles.modalContainer}>
                    
                <View style={styles.modalSubContainer}>
                <TouchableOpacity onPress={() => fecharModal()} style={styles.modalTextContainer}>
                    <TextFont texto={"Fechar"} color={'white'}/>
                </TouchableOpacity>
                <Picker
                        
                        selectedValue={motivo}
                        onValueChange={(itemValue, itemIndex) => setMotivo(itemValue)}>
                        <Picker.Item label="Crítica" value="Crítica" />
                        <Picker.Item label="Denúncia" value="Denúncia" />
                        <Picker.Item label="Elogio" value="Elogio" />
                        <Picker.Item label="Informação" value="Informação" />
                        <Picker.Item label="Reclamação" value="Reclamação" />
                        <Picker.Item label="Solicitação" value="Solicitação" />
                        <Picker.Item label="Sugestão" value="Sugestão" />
                    </Picker>
                </View>
                </View>
    )
}
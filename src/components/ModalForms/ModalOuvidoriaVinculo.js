import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import {Picker} from '@react-native-picker/picker';
import {styles} from './style'

export function ModalOuvidoriaVinculo({fecharModal, vinculo, setVinculo}){
    return (
        <View style={styles.modalContainer}>
                    
                <View style={styles.modalSubContainer}>
                <TouchableOpacity onPress={() => fecharModal()} style={styles.modalTextContainer}>
                    <TextFont texto={"Fechar"} color={'white'}/>
                </TouchableOpacity>
                <Picker
                        
                        selectedValue={vinculo}
                        onValueChange={(itemValue, itemIndex) => setVinculo(itemValue)}>
                        <Picker.Item label="Servidor" value="Servidor" />
                        <Picker.Item label="Aluno" value="Aluno" />
                        <Picker.Item label="Professor" value="Professor" />
                        <Picker.Item label="Terceirizado" value="Terceirizado" />
                        <Picker.Item label="Usuário/Outros" value="Usuário/Outros" />
                    </Picker>
                </View>
                </View>
    )
}
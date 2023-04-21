import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import {Picker} from '@react-native-picker/picker';
import {styles} from './style'

export function ModalCoordenador({fecharModal, selectedValue, setSelectedValue}){
    return (
        <View style={styles.modalContainer}>
                    
                <View style={styles.modalSubContainer}>
                <TouchableOpacity onPress={() => fecharModal()} style={styles.modalTextContainer}>
                    <TextFont texto={"Fechar"} color={'white'}/>
                </TouchableOpacity>
                <Picker
             selectedValue={selectedValue}
             onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)}>
             <Picker.Item label="Administração" value="0" />
             <Picker.Item label="Ciências Contábeis" value="1" />
             <Picker.Item label="Educação Física (Bacharelado)" value="2" />
             <Picker.Item label="Educação Física (Licenciatura)" value="3" />
             <Picker.Item label="Enfermagem" value="4" />
             <Picker.Item label="Engenharia Civil" value="5" />
             <Picker.Item label="Estética" value="6" />
             <Picker.Item label="Farmácia" value="7" />
             <Picker.Item label="Fisioterapia" value="8" />
             <Picker.Item label="Nutrição" value="9" />
             <Picker.Item label="Pedagogia" value="10" />
             <Picker.Item label="Psicologia" value="11" />
             <Picker.Item label="Serviço Social" value="12" />
            </Picker>
                </View>
                </View>
    )
}
import { TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

export function Footer(){
    return(
        <View style={styles.containerFooter}>
            <TouchableOpacity>
                <Ionicons name="home-outline" size={30} />
            </TouchableOpacity>
            
            <TouchableOpacity>
            <Ionicons name="document-attach-outline" size={30}  />
            </TouchableOpacity>
            
            <TouchableOpacity>
            <Feather name="message-circle" size={30} />
            </TouchableOpacity>

            <TouchableOpacity>
            <Feather name="user" size={30} />
            </TouchableOpacity>
        </View>
    )
}
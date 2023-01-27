import { styles } from "./style";
import { ActivityIndicator, View } from "react-native";
export function Loading(){
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator style={styles.loading} color='#fff' size={50}/>
        </View>
    )
}
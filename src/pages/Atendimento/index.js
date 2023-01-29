import { Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
export function Atendimento(){
    return(
        <View style={{marginTop: 0 + getStatusBarHeight()}}>
            <Text>Atendimento</Text>
        </View>
    )
}
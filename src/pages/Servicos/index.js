import { View, Text, ScrollView } from 'react-native'
import { styles } from './style'
import { Historico } from '../../components/Historico/index'
import { ComprovanteDeMatricula } from '../../components/ComprovanteDeMatricula'

export function Servicos() {
    return (
        <View style={styles.backContainer}>
            <View style={styles.frontContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Serviços</Text>
                    <Text style={styles.subtitle}>Solicite documentos e certidões</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.servicesContainer}
                >
                    <Historico />
                    <ComprovanteDeMatricula />
                </ScrollView>
            </View>
        </View>
    );
}
import {StyleSheet} from 'react-native'
import { colors } from '../../../styles/theme'

export const styles = StyleSheet.create({
    backContainer: {
        flex: 1,
        backgroundColor: colors.gray[800]
    },
    frontContainer: {
        flex: 1,
        padding: 30,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: colors.white

    }
})
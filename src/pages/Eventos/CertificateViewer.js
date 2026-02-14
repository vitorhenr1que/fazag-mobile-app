import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../styles/theme';

export function CertificateViewer() {
    const navigation = useNavigation();
    const route = useRoute();
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={colors.gray[800]} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Certificado</Text>
                <View style={{ width: 40 }} />
            </View>

            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary[500]} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[100],
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray[900],
    },
    backButton: {
        padding: 8,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    }
});

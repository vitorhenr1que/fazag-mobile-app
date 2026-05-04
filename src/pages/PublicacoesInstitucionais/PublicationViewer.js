import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Share, 
    Image, 
    ActivityIndicator, 
    Platform, 
    Alert 
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as FileSystem from 'expo-file-system';

export function PublicationViewer() {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        try {
            await Share.share({
                title: item.title,
                message: `${item.title}\n${item.fileUrl}`,
                url: Platform.OS === 'ios' ? item.fileUrl : undefined,
            });
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const fileUri = `${FileSystem.cacheDirectory}${item.fileName.replace(/\s+/g, '_')}`;
            
            // Download to cache first
            const downloadResumable = FileSystem.createDownloadResumable(
                item.fileUrl,
                fileUri
            );
            const { uri } = await downloadResumable.downloadAsync();

            if (Platform.OS === 'ios') {
                // On iOS, sharing a local file URI allows "Save to Files"
                await Share.share({
                    url: uri,
                    title: item.title
                });
            } else {
                // Android: Move from cache to public Downloads folder
                const { fs } = ReactNativeBlobUtil;
                const { DownloadDir } = fs.dirs;
                const destinationPath = `${DownloadDir}/${item.fileName.replace(/\s+/g, '_')}`;
                
                // Remove 'file://' prefix for ReactNativeBlobUtil
                const cleanUri = uri.replace('file://', '');
                
                await fs.cp(cleanUri, destinationPath);
                
                // Add to Download Manager
                ReactNativeBlobUtil.android.addCompleteDownload({
                    title: item.title,
                    description: 'Download concluído pela FAZAG',
                    mime: item.mimeType || 'application/pdf',
                    path: destinationPath,
                    showNotification: true,
                });
                
                Alert.alert('Sucesso', 'Arquivo salvo na sua pasta de Downloads!');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert('Erro', 'Não foi possível salvar o arquivo no dispositivo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewerHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.viewerActionButton}>
                    <Ionicons name="close" size={26} color={colors.gray[800]} />
                </TouchableOpacity>
                
                <Text style={styles.viewerTitle} numberOfLines={1}>{item.title}</Text>
                
                <View style={styles.viewerActions}>
                    <TouchableOpacity onPress={handleSave} style={styles.viewerActionButton}>
                        <Feather name="download" size={22} color={colors.primary[600]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} style={styles.viewerActionButton}>
                        <Feather name="share-2" size={22} color={colors.primary[600]} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.viewerContent}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={colors.primary[600]} />
                        <Text style={{ marginTop: 10, color: colors.gray[600] }}>Baixando...</Text>
                    </View>
                )}

                {item.fileType === 'pdf' ? (
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: item.fileUrl, cache: true }}
                        style={styles.pdf}
                        renderActivityIndicator={() => <ActivityIndicator size="large" color={colors.primary[600]} />}
                        onError={(error) => {
                            console.error(error);
                            Alert.alert('Erro', 'Não foi possível carregar o PDF.');
                        }}
                    />
                ) : item.fileType === 'image' ? (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.fileUrl }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                ) : (
                    <View style={styles.unsupported}>
                        <Feather name="alert-circle" size={48} color={colors.gray[300]} />
                        <Text style={styles.unsupportedText}>
                            Este formato ({item.fileType}) não suporta visualização direta no app. 
                            Use o botão de baixar para visualizar.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

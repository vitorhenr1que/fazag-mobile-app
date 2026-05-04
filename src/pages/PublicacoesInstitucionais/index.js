import React, { useState, useEffect, useMemo } from 'react';
import { 
    View, 
    Text, 
    StatusBar, 
    SectionList, 
    TouchableOpacity, 
    ActivityIndicator, 
    Linking,
    RefreshControl
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../../styles/theme';
import { styles } from './style';
import { getPublicacoes } from '../../services/publicacoes/publicacoesApi';
import { useNavigation } from '@react-navigation/native';

export function PublicacoesInstitucionais() {
    const navigation = useNavigation();
    const [publicacoes, setPublicacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPublicacoes = async () => {
        try {
            const data = await getPublicacoes();
            setPublicacoes(data);
        } catch (error) {
            console.error("Erro ao buscar publicações:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPublicacoes();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPublicacoes();
    };

    const sections = useMemo(() => {
        if (!publicacoes || publicacoes.length === 0) return [];

        const grouped = publicacoes.reduce((acc, pub) => {
            const category = pub.category || 'Outros';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(pub);
            return acc;
        }, {});

        return Object.keys(grouped).sort().map(category => ({
            title: category,
            data: grouped[category].sort((a, b) => (a.order || 0) - (b.order || 0))
        }));
    }, [publicacoes]);

    const handleOpenLink = (item) => {
        navigation.navigate('PublicationViewer', { item });
    };

    const formatSize = (bytes) => {
        if (!bytes) return '';
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        const mb = kb / 1024;
        return `${mb.toFixed(1)} MB`;
    };

    const getIcon = (fileType) => {
        switch (fileType) {
            case 'pdf':
                return { name: 'file-pdf', color: colors.red[500], bg: colors.red[100] };
            case 'image':
                return { name: 'file-image', color: colors.blue[500], bg: colors.primary[100] };
            default:
                return { name: 'file-alt', color: colors.gray[500], bg: colors.gray[200] };
        }
    };

    const renderPublicationItem = ({ item }) => {
        const icon = getIcon(item.fileType);

        return (
            <TouchableOpacity 
                style={styles.publicationCard}
                onPress={() => handleOpenLink(item)}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, { backgroundColor: icon.bg }]}>
                    <FontAwesome5 name={icon.name} size={22} color={icon.color} />
                </View>
                
                <View style={styles.contentContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    {item.description && (
                        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                    )}
                    <View style={styles.metaContainer}>
                        <Feather name="download" size={12} color={colors.gray[400]} />
                        <Text style={styles.sizeText}>{formatSize(item.size)}</Text>
                    </View>
                </View>

                <Feather name="chevron-right" size={20} color={colors.gray[300]} />
            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary[800]} />
            <LinearGradient
                colors={[colors.primary[800], colors.primary[600]]}
                style={styles.headerGradient}
            >
                <Text style={styles.headerTitle}>Publicações</Text>
                <Text style={styles.headerSubtitle}>Documentos e informativos institucionais.</Text>
            </LinearGradient>
        </>
    );

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary[600]} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderPublicationItem}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary[600]]} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Feather name="file-text" size={48} color={colors.gray[200]} />
                        <Text style={styles.emptyText}>Nenhuma publicação encontrada.</Text>
                    </View>
                }
            />
        </View>
    );
}

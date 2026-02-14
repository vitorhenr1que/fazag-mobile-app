import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const { height } = Dimensions.get('window');

export function ModernSelectModal({ visible, onClose, title, options, onSelect, selectedValue }) {

    const renderItem = ({ item }) => {
        const isSelected = selectedValue === item.value;

        return (
            <TouchableOpacity
                style={[
                    styles.optionItem,
                    isSelected && styles.optionItemSelected
                ]}
                onPress={() => {
                    onSelect(item.value);
                    onClose();
                }}
            >
                <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                ]}>
                    {item.label}
                </Text>
                {isSelected && (
                    <Feather name="check" size={20} color={colors.primary[600]} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <View style={styles.handle} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Feather name="x" size={24} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={options}
                        keyExtractor={(item) => String(item.value)}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 12,
        maxHeight: height * 0.7, // Limit height to 70% of screen
        paddingBottom: 30, // Safe area bottom
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[100],
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.gray[300],
        borderRadius: 2,
        marginBottom: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    closeButton: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    optionItemSelected: {
        backgroundColor: colors.primary[50] + '40', // Very subtle highlight
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        color: colors.gray[600],
        fontWeight: '500',
    },
    optionTextSelected: {
        color: colors.primary[600],
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: colors.gray[100],
    }
});

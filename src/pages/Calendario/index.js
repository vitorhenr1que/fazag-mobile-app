import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StatusBar, SectionList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { colors } from '../../../styles/theme';
import { styles } from './style';
import { generateAllMarkedDates, getEventsForDate, STATUS_COLORS, STATUS_LABELS } from '../../data/calendario';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

// Configure Locale
LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export function Calendario() {
    const today = new Date().toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();
    const [selectedDate, setSelectedDate] = useState(today);
    const [calendarioData, setCalendarioData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Calendar Data
    useEffect(() => {
        const fetchCalendario = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://fazag.edu.br/api/calendario?ano=${currentYear}`);
                setCalendarioData(response.data);
            } catch (error) {
                console.error("Erro ao buscar calendário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCalendario();
    }, [currentYear]);

    // Generate marked dates
    const markedDates = useMemo(() => {
        const baseMarked = generateAllMarkedDates(calendarioData, currentYear);

        return {
            ...baseMarked,
            [selectedDate]: {
                ...(baseMarked[selectedDate] || {}),
                selected: true,
                selectedColor: colors.primary[600],
                selectedTextColor: '#ffffff'
            }
        };
    }, [selectedDate, currentYear, calendarioData]);

    // Get events for selected DATE
    const selectedDateEvents = useMemo(() => getEventsForDate(calendarioData, selectedDate), [selectedDate, calendarioData]);

    // Get events for selected MONTH
    const dateObj = new Date(selectedDate);
    const selectedMonth = parseInt(selectedDate.split('-')[1], 10);
    const selectedMonthIndex = selectedMonth - 1;
    const monthEvents = calendarioData.find(m => m.monthIndex === selectedMonthIndex)?.events || [];

    const sections = [];

    if (selectedDateEvents.length > 0) {
        sections.push({
            title: `Eventos do dia ${selectedDate.split('-').reverse().join('/')}`,
            data: selectedDateEvents
        });
    } else {
        sections.push({
            title: `Dia ${selectedDate.split('-').reverse().join('/')}`,
            data: [{ empty: true, text: "Nenhum evento agendado para este dia." }]
        });
    }

    if (monthEvents.length > 0) {
        // Optional: Filter out events of the selected day from the month list?
        // Let's keep them for full context.
        sections.push({
            title: `Eventos de ${LocaleConfig.locales['pt-br'].monthNames[selectedMonthIndex]}`,
            data: monthEvents
        });
    }

    const renderEventItem = ({ item }) => {
        if (item.empty) {
            return (
                <View style={[styles.eventCard, { justifyContent: 'center', padding: 20 }]}>
                    <Text style={[styles.eventTitle, { textAlign: 'center', color: colors.gray[400] }]}>
                        {item.text}
                    </Text>
                </View>
            );
        }

        const statusColor = STATUS_COLORS[item.status] || colors.gray[500];
        const statusLabel = STATUS_LABELS[item.status] || 'Evento';

        return (
            <View style={styles.eventCard}>
                <View style={[styles.dateContainer, { borderRightWidth: 0, borderLeftWidth: 4, borderLeftColor: statusColor }]}>
                    <Text style={styles.dateDay}>{item.day}</Text>
                    <Text style={styles.dateLabel}>DIA</Text>
                </View>
                <View style={styles.eventContent}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                        <Text style={styles.statusText}>{statusLabel}</Text>
                    </View>
                    <Text style={styles.eventTitle}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary[800]} />
            <LinearGradient
                colors={[colors.primary[800], colors.primary[600]]}
                style={styles.headerGradient}
            >
                <Text style={styles.headerTitle}>Calendário Acadêmico</Text>
                <Text style={styles.headerSubtitle}>Confira datas, feriados e eventos importantes.</Text>
            </LinearGradient>

            <View style={styles.calendarWrapper}>
                <Calendar
                    current={selectedDate}
                    onDayPress={day => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        backgroundColor: colors.white,
                        calendarBackground: colors.white,
                        textSectionTitleColor: colors.gray[400],
                        selectedDayBackgroundColor: colors.primary[600],
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: colors.primary[600],
                        dayTextColor: colors.gray[800],
                        textDisabledColor: colors.gray[300],
                        dotColor: colors.primary[600],
                        selectedDotColor: '#ffffff',
                        arrowColor: colors.primary[600],
                        disabledArrowColor: colors.gray[200],
                        monthTextColor: colors.primary[800],
                        indicatorColor: colors.primary[600],
                        textDayFontFamily: 'Inter_400Regular',
                        textMonthFontFamily: 'Inter_600SemiBold',
                        textDayHeaderFontFamily: 'Inter_500Medium',
                        textDayFontSize: 14,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 12
                    }}
                />
            </View>
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
                keyExtractor={(item, index) => (item.text || 'empty') + index}
                renderItem={renderEventItem}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Feather name="calendar" size={16} color={colors.primary[800]} style={{ marginRight: 8 }} />
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
            />
        </View>
    );
}
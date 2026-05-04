import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useState, useEffect } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../styles/theme";
import { LinearGradient } from 'expo-linear-gradient';

const contacts = [
    {
        id: 1,
        title: "Atendimento Geral",
        email: "faculdade@fazag.edu.br",
        phone: "5575982296725",
        icon: "headset"
    },
    {
        id: 2,
        title: "Secretaria Acadêmica",
        email: "secretaria@fazag.edu.br",
        phone: "5575981044923",
        icon: "file-tray-full"
    },
    {
        id: 3,
        title: "Financeiro do Aluno",
        email: "financeiro@fazag.edu.br",
        phone: "5575982181138",
        icon: "cash"
    },
    {
        id: 4,
        title: "Setor de Diplomas",
        email: "diplomas@fazag.edu.br",
        phone: "5575982181511",
        icon: "ribbon"
    }
];

export function CanaisDeAtendimento({ route }) {
    const [hours, setHours] = useState('')
    const { sector } = route.params || {};

    useEffect(() => {
        setHours(new Date().getHours())
    }, [])

    useEffect(() => {
        if (sector) {
            const contact = contacts.find(c => 
                c.title.toLowerCase().includes(sector.toLowerCase()) || 
                c.id.toString() === sector
            );
            if (contact) {
                abrirWhatsapp(contact.phone);
            }
        }
    }, [sector, hours])

    function abrirWhatsapp(phoneNumber) {
        let message = '';
        if (hours >= 5 && hours < 12) {
            message = 'Olá, bom dia!'
        }
        else if (hours >= 12 && hours < 18) {
            message = 'Olá, boa tarde!'
        } else {
            message = 'Olá, boa noite!'
        }

        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        Linking.openURL(url).catch(() => {
            alert('Não foi possível abrir o WhatsApp. Verifique se ele está instalado.');
        });
    }



    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={[colors.primary[800], colors.primary[600]]}
                    style={styles.headerGradient}
                >
                    <Text style={styles.title}>Canais de Atendimento</Text>
                    <Text style={styles.subtitle}>Precisa de ajuda? Entre em contato{'\n'}diretamente pelo WhatsApp.</Text>
                </LinearGradient>

                <View style={styles.contentContainer}>
                    {contacts.map((contact) => (
                        <TouchableOpacity
                            key={contact.id}
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() => abrirWhatsapp(contact.phone)}
                        >
                            <View style={styles.iconContainer}>
                                <Ionicons name={contact.icon} size={24} color={colors.primary[600]} />
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.cardTitle}>{contact.title}</Text>
                                <Text style={styles.cardSubtitle}>{contact.email}</Text>
                            </View>

                            <View style={styles.actionIcon}>
                                <Ionicons name="logo-whatsapp" size={24} color={colors.green[500]} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
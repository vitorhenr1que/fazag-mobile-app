import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ItemMatriz } from "../../components/Pedagogico/itemMatriz";
import { ItemGrade } from "../../components/Pedagogico/itemGrade";
import { AuthContext } from "../../contexts/auth";
import { useContext, useEffect, useState } from "react";
import Pdf from "react-native-pdf";
import { ItemAntDesign } from "../../components/Pedagogico/itemAntDesign";
import { ItemMaterial } from "../../components/Pedagogico/itemMaterial";
import { ItemBibliotecaVirtual } from "../../components/Pedagogico/itemBibliotecaVirtual";
import { ItemNusp } from "../../components/Pedagogico/itemNusp";
import { calcularSemestre } from "../../scripts/calcularSemestre";
import { colors } from "../../../styles/theme";


export function Pedagogico() {
    const [isPdfView, setIsPdfView] = useState(false)
    const { userHistoric, user } = useContext(AuthContext)
    const semestreAtual = userHistoric && userHistoric.length > 0 ? userHistoric[userHistoric.length - 1] : null;
    const [linkMatriz, setLinkMatriz] = useState(``)
    const [linkGrade, setLinkGrade] = useState(``)
    const [link, setLink] = useState(``)

    const rawCourse = user?.curso || (semestreAtual?.s_descricao ? semestreAtual.s_descricao.split('<')[0] : "ADMINISTRAÇÃO");
    const course = rawCourse.split('<')[0].trim().toUpperCase();


    const courses = {
        "ADMINISTRAÇÃO": { grade: "grade-administracao", matriz: "administracao" },
        "CIENCIAS CONTABEIS": { grade: "grade-ciencias-contabeis", matriz: "ciencias-contabeis" },
        "EDUCAÇÃO FÍSICA- LICENCIATURA": { grade: "grade-educacao-fisica-licenciatura", matriz: "educacao-fisica-licenciatura" },
        "EDUCAÇAO FISICA - BACHARELADO": { grade: "grade-educacao-fisica-bacharelado", matriz: "educacao-fisica-bacharelado" },
        "ENGENHARIA CIVIL": { grade: "grade-engenharia-civil", matriz: "engenharia-civil" },
        "ENFERMAGEM": { grade: "grade-enfermagem", matriz: "enfermagem" },
        "ESTÉTICA E COSMÉTICA": { grade: "grade-estetica", matriz: "estetica" },
        "FARMACIA": { grade: "grade-farmacia", matriz: "farmacia" },
        "FISIOTERAPIA": { grade: "grade-fisioterapia", matriz: "fisioterapia" },
        "NUTRIÇÃO": { grade: "grade-nutricao", matriz: "nutricao" },
        "PEDAGOGIA": { grade: "grade-pedagogia", matriz: "pedagogia" },
        "PSICOLOGIA": { grade: "grade-psicologia", matriz: "psicologia" },
        "SERVIÇO SOCIAL": { grade: "grade-servico-social", matriz: "servico-social" },
    }
    const PdfResource = { uri: link, cache: true }
    function handleIconClick(link) {
        if (!link) return;
        setLink(link);
        setIsPdfView(true);
    }

    const courseConfig = courses[course] || courses["ADMINISTRAÇÃO"];

    useEffect(() => {
        if (courseConfig) {
            setLinkGrade(`https://www.fazag.edu.br/static/horarios/${courseConfig.grade}.pdf`);
            setLinkMatriz(`https://www.fazag.edu.br/static/matrizes/${courseConfig.matriz}.pdf`);
        }
    }, [courseConfig]);
    return isPdfView ? (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{ padding: 15, backgroundColor: colors.white }}
                onPress={() => setIsPdfView(false)}
            >
                <Text style={{ color: colors.blue[500], fontWeight: 'bold' }}>← Voltar</Text>
            </TouchableOpacity>
            <Pdf
                trustAllCerts={false}
                source={PdfResource}
                style={styles.pdf}
            />
        </View>
    ) : (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Pedagógico</Text>
                    <Text style={styles.subtitle}>{course}</Text>
                </View>

                <View style={styles.containerBox}>
                    <ItemGrade text={'Grade e Corpo Docente'} color={colors.blue[500]} iconName={'text-document'} size={24} handleClick={handleIconClick} link={linkGrade} />
                    <ItemMatriz text={'Matriz Curricular'} color={colors.blue[500]} iconName={'document-text-outline'} size={24} handleClick={handleIconClick} link={linkMatriz} />
                </View>
                <View style={styles.containerBox}>
                    <ItemAntDesign text={'Calendário Acadêmico'} color={colors.blue[500]} iconName={'calendar'} size={24} handleClick={handleIconClick} link={`https://www.fazag.edu.br/static/calendario/calendario${calcularSemestre()}.pdf`} />
                    <ItemMaterial text={'Regulamento Geral'} color={colors.blue[500]} iconName={'account-balance'} size={24} handleClick={handleIconClick} link={'https://www.fazag.edu.br/static/regulamentos/regulamentogeral.pdf'} />
                </View>
                <View style={styles.containerBox}>
                    <ItemBibliotecaVirtual text={'Biblioteca Virtual'} color={colors.blue[500]} iconName={'bookshelf'} size={24} />
                    <ItemNusp text={'Nusp'} color={colors.blue[500]} iconName={'brain'} size={24} />
                </View>
            </ScrollView>
        </View>
    )
}
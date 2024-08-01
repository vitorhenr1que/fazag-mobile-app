import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ItemMatriz } from "../../components/Pedagogico/itemMatriz";
import { ItemGrade } from "../../components/Pedagogico/itemGrade";
import { AuthContext } from "../../contexts/auth";
import { useContext, useEffect, useState } from "react";
import Pdf from "react-native-pdf";
import { ItemAntDesign } from "../../components/Pedagogico/itemAntDesign";
import { ItemMaterial } from "../../components/Pedagogico/itemMaterial";

export function Pedagogico(){
    const [isPdfView, setIsPdfView] = useState(false)
    const {userHistoric} = useContext(AuthContext)
    const semestreAtual = userHistoric[userHistoric.length - 1]
    const [linkMatriz, setLinkMatriz] = useState(``)
    const [linkGrade, setLinkGrade] = useState(``)
    const [link, setLink] = useState(``)
    const course = semestreAtual.s_descricao.split('<')[0]


    const courses = {
        "ADMINISTRAÇÃO": {grade: "grade-administracao", matriz: "administracao"},
        "CIENCIAS CONTABEIS": {grade: "grade-ciencias-contabeis", matriz: "ciencias-contabeis"},
        "EDUCAÇÃO FÍSICA- LICENCIATURA": {grade: "grade-educacao-fisica-licenciatura", matriz: "educacao-fisica-licenciatura"},
        "EDUCAÇAO FISICA - BACHARELADO": {grade: "grade-educacao-fisica-bacharelado", matriz: "educacao-fisica-bacharelado"},
        "ENGENHARIA CIVIL": {grade: "grade-engenharia-civil", matriz: "engenharia-civil"},
        "ENFERMAGEM": {grade: "grade-enfermagem", matriz: "enfermagem"},
        "ESTÉTICA E COSMÉTICA": {grade: "grade-estetica", matriz: "estetica"},
        "FARMACIA": {grade: "grade-farmacia", matriz: "farmacia"},
        "FISIOTERAPIA": {grade: "grade-fisioterapia", matriz: "fisioterapia"},
        "NUTRIÇÃO": {grade: "grade-nutricao", matriz: "nutricao"},
        "PEDAGOGIA": {grade: "grade-pedagogia", matriz: "pedagogia"},
        "PSICOLOGIA": {grade: "grade-psicologia", matriz: "psicologia"},
        "SERVIÇO SOCIAL": {grade: "grade-servico-social", matriz: "servico-social"},
    }
    const PdfResource = {uri: link, cache: true}
    function handleIconClick(link){
        setLink(link)
        setIsPdfView(true)
    }
    useEffect(() => {
        setLinkGrade(`https://www.fazag.edu.br/static/horarios/${courses[course].grade}.pdf`)
        setLinkMatriz(`https://www.fazag.edu.br/static/matrizes/${courses[course].matriz}.pdf`)
    },[])
    return isPdfView ? (
        <Pdf 
        trustAllCerts={false}
        source={PdfResource}
        onLoadComplete={(numberOfPages,filePath)=>{
            console.log(`Número de Páginas: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages)=>{
            console.log(`Página atual: ${page}`);
        }}
        onError={(error)=>{
            console.log(error);
        }}
        style={styles.pdf}/>
    ) : (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.containerBox}>
                    <ItemGrade text={'Grade e Corpo Docente'} color={'black'} iconName={'text-document'} size={20} handleClick={handleIconClick} link={linkGrade}/>
                    <ItemMatriz text={'Matriz Curricular'} color={'black'} iconName={'document-text-outline'} size={20} handleClick={handleIconClick} link={linkMatriz}/>
                </View>
                <View style={styles.containerBox}>
                    <ItemAntDesign text={'Calendário Acadêmico'} color={'black'} iconName={'calendar'} size={20} handleClick={handleIconClick} link={`https://www.fazag.edu.br/static/calendario/calendario-academico.pdf`}/>
                    <ItemMaterial text={'Regulamento Geral'} color={'black'} iconName={'account-balance'} size={20} handleClick={handleIconClick} link={'https://www.fazag.edu.br/static/regulamentos/regulamentogeral.pdf'}/>
                </View>
            </ScrollView>
        </View>
    )
}
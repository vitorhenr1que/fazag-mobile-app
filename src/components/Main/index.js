
import { ActivityIndicator, ScrollView, View } from "react-native";
import { nomeAluno } from "../nomeAluno";
import { ListBoxMainHorizontal } from "../BoxMainHorizontal/ListBoxMainHorizontal";
import { ListBoxMainVertical } from "../BoxMainVertical/ListBoxMainVertical";
import { styles } from "./style";
import { TextFont } from "../Basics/TextFont";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";


export function Main(){

   const { loading } = useContext(AuthContext)

    return(
        <View style={styles.testV}>
            {loading && <View style={styles.generalContainer}><ActivityIndicator color={'#303030'}/></View>}
           
            <ScrollView style={styles.scrollMain} showsVerticalScrollIndicator={false}>
            <View style={styles.olaAluno}>
                <TextFont texto={`Olá ${nomeAluno()}!`} fontWeight={"bold"} fontSize={32}/>
            </View>

            <View style={styles.container}>
                <ListBoxMainVertical/>
            </View>
            </ScrollView>
        
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollh}>

                <ListBoxMainHorizontal/>

            </ScrollView>
        </View>
    )
}
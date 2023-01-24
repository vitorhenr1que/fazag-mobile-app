import {  Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

const home = require('../../../assets/home.png')
const message = require('../../../assets/message.png')
const user = require('../../../assets/user.png')
const historic = require('../../../assets/historic.png')

export function Footer(){
    return(
        <View style={styles.containerFooter}>
            <TouchableOpacity>
                <Image source={home} style={styles.icon}/>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image source={historic} style={styles.icon}/>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image source={message} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <Image source={user} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    )
}
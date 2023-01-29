import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignInPage } from "../pages/SignIn"


export function SignIn(){
    const AuthStack =  createNativeStackNavigator()
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="SignIn" component={SignInPage}/>
        </AuthStack.Navigator>
    )
}
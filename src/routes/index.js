import { useContext } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../contexts/auth";
import AppRoute from "./app.route";
import { SignIn } from "./auth.route";

export default function Routes(){
    const {signed} = useContext(AuthContext)
    
    
      return signed ? <AppRoute/> : <SignIn/>
 
}
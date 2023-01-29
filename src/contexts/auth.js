import { useRoute } from "@react-navigation/native";
import { createContext, useState } from "react";

export const AuthContext = createContext()
export default function AuthProvider({children}){

    

   const [user, setUser] = useState(null)

return (
    <AuthContext.Provider value={{signed: !!user , user}}>
        {children}
    </AuthContext.Provider>
)
}
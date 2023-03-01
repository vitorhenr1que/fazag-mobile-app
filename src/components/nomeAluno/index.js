import { useContext } from "react"
import { Text, View } from "react-native"
import { AuthContext } from "../../contexts/auth"

export function nomeAluno(){
    const {user} = useContext(AuthContext)
    const firstNameLowerCase = user.name.split(' ')[0].toLowerCase().split("")
    const firstLetterUpperCase = firstNameLowerCase[0].toUpperCase()
    const restName = firstNameLowerCase.splice(1)
    const firstname = [firstLetterUpperCase, ...restName].join('')

    return(
        <>
        {firstname}
        </>
    )
}
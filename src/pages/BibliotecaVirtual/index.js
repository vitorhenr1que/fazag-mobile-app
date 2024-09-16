
import { WebView } from 'react-native-webview'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'


export function BibliotecaVirtual(){
    const { urlBv } = useContext(AuthContext)
    if( urlBv ){
        return(
            <WebView source={{uri: urlBv}}/> 
         )
    }
    else {
        return (
            alert('Url é:', urlBv)
        )
    }   

}
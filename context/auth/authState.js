import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import { USUARIO_AUTENTICADO } from "../../types";

const AuthState = ({children})=>{

    //Definir state inicial
    const initialState = {
        token: "",
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el Reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registrarUsuario = datos => {
        console.log(datos)
    }

    // Usuario autenticado
    const usuarioAutenticado = nombre =>{
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
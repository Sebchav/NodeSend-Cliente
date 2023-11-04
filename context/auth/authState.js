import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA, LOGIN_ERROR, LOGIN_EXITOSO, USUARIO_AUTENTICADO, CERRAR_SESION } from "../../types";

const AuthState = ({children})=>{

    //Definir state inicial
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token"): "",
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el Reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try{
            const respuesta = await clienteAxios.post("/api/usuarios", datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });

        }catch(error){
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        //limpia la alerta despues de 3 seg
        setTimeout(()=> {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    const iniciarSesion = async datos => {
        try{
            const respuesta = await clienteAxios.post("/api/auth", datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        }catch(error){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        //limpia la alerta despues de 3 seg
        setTimeout(()=> {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }
    
    //Retorne el Usuario autenticado en base al JWT
    const usuarioAutenticado = async() =>{
        const token = localStorage.getItem("token");
        if(token){
            tokenAuth(token);
        }

        try{
            const respuesta = await clienteAxios.get("/api/auth");
            
            if(respuesta.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
   
        }catch(error){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Cerrar la sesión
    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION
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
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
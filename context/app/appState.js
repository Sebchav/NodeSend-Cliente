import { use, useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";

import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO, 
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from "../../types"

const AppState = ({ children })=> {

    const initialState = {
        mensaje_archivo : null,
        nombre: "",
        nombre_original: "",
        cargando: null,
        descargas: 1,
        password: "",
        autor: null,
        url: ""
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(()=>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    const subirArchivo = async(formData, nombreArchivo)=> {
        
        dispatch({
            type: SUBIR_ARCHIVO
        })

        try{
            const resultado = await clienteAxios.post("/api/archivos", formData);
            console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })

        }catch(error){
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }

    }

    // Crea un enlace una vez se subio el archivo
    const crearEnlace = async()=> {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try{
            const resultado = await clienteAxios.post("/api/enlaces", data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        }catch(error){
            console.log(error);
        }
    }

    const limpiarState = ()=>{
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    //Agregue el password
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombreOriginal: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo, 
                crearEnlace,
                limpiarState,
                agregarPassword, 
                agregarDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;
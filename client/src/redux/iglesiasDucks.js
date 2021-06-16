import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'

//  CONSTANTES
const dataInicial = {
    datos: [],
    mensaje: "",
    loading: false,
    regis: true
}


// ACTION TYPES
const IGLESIAS_LOADING = '@iglesias/loading'
const OBTENER_IGLESIAS = '@iglesias/traerTodas'
const AGREGAR_IGLESIA = '@iglesias/Agregar'
const REGISTRO_ERROR = '@iglesias/Error'
const ACTUALIZA_IGLESIA = '@iglesias/Actualizar'
const BORRA_IGLESIA = '@iglesias/Borrar'
const SUBIR_LOGO = '@iglesias/uploadLogo'
const CAMBIA_LOGO = '@iglesias/updateLogo'
const ELIMINAR_LOGO = '@iglesias/deleteLogo'
const ERR_SUBIR_LOGO = '@iglesias/error/uploadLogo'
const ERR_ELIMINAR_LOGO = '@iglesias/error/deleteLogo'
const ERR_CAMBIA_LOGO = '@iglesias/error/updateLogo'

//  REDUCER
export default function iglesiasReducer(state = dataInicial, action) {
    switch (action.type) {
        case IGLESIAS_LOADING:
            return { ...state, loading: true }
        case OBTENER_IGLESIAS:
            return { ...state, datos: action.payload, loading: false }
        case AGREGAR_IGLESIA:
        case BORRA_IGLESIA:
        case ACTUALIZA_IGLESIA:
            return { ...state, datos: action.payload, loading: false, regis: true }
        case SUBIR_LOGO:
        case CAMBIA_LOGO:
        case ELIMINAR_LOGO:
        case REGISTRO_ERROR:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}

// ACCIONES
export const obtenerIglesias = () => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })


    Axios.get(`${backendUrl}/iglesias`)
        .then(res =>
            dispatch({
                type: OBTENER_IGLESIAS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: REGISTRO_ERROR
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })


}

export const agregarIglesia = (datos) => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })

    Axios.post(`${backendUrl}/iglesias`, datos)
        .then(result => {
            dispatch({ type: AGREGAR_IGLESIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'))
            dispatch({ type: REGISTRO_ERROR })
        })

}


export const actualizaIglesia = (datos) => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })

    Axios.put(`${backendUrl}/iglesias/${datos._id}`, datos)
        .then(result => {
            dispatch({ type: ACTUALIZA_IGLESIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: REGISTRO_ERROR })
        })
}

export const borraIglesia = (datos) => async (dispatch, getState) => {

    Axios.delete(`${backendUrl}/iglesias/${datos._id}`)
        .then(result => {
            dispatch({ type: BORRA_IGLESIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: REGISTRO_ERROR })
        })


}

export const subirLogo = (imagen, idIglesia) => async (dispatch, getState) => {

    Axios.post(`${backendUrl}/iglesias/logo/${idIglesia}`, imagen)
        .then(result => {
            dispatch({ type: SUBIR_LOGO, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_SUBIR_LOGO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_SUBIR_IMAGEN'))
        })

}

export const eliminarLogo = (imagen, idIglesia) => async (dispatch, getState) => {

    Axios.post(`${backendUrl}/iglesias/logo/borrar/${idIglesia}`, imagen)
        .then(result => {
            dispatch({ type: ELIMINAR_LOGO, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_ELIMINAR_LOGO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_ELIMINAR_IMAGEN'))
        })

}

export const cambiarLogo = (imagen, idIglesia) => async (dispatch, getState) => {

    Axios.put(`${backendUrl}/iglesias/logo/${idIglesia}`, imagen)
        .then(result => {
            dispatch({ type: CAMBIA_LOGO, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_CAMBIA_LOGO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_CAMBIA_IMAGEN'))
        })

}
import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'

//  CONSTANTES
const dataInicial = {
    datos: [],
    loading: false,
    regis: true
}

//  TYPES
const USUARIOS_LOADING = '@usuarios/Loading'
const OBTENER_USUARIOS = '@usuarios/TraerTodos'
const REGISTER_SUCCESS = '@usuarios/Agregar'
const REGISTRO_ERROR = '@usuarios/Error'
const UPDATE_USUARIO = '@usuarios/Actualizar'
const BORRA_USUARIO = '@usuario/Borrar'
const SUBIR_IMAGEN = '@usuario/uploadImage'
const CAMBIA_IMAGEN = '@usuario/updateImage'
const ELIMINAR_IMAGEN = '@usuario/deleteImage'
const ERR_SUBIR_IMAGEN = '@usuario/error/uploadImage'
const ERR_ELIMINAR_IMAGEN = '@usuario/error/deleteImage'
const ERR_CAMBIA_IMAGEN = '@usuario/error/updateImage'
//REDUCER
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case USUARIOS_LOADING:
            return { ...state, loading: true }
        case BORRA_USUARIO:
        case REGISTER_SUCCESS:
        case UPDATE_USUARIO:
        case OBTENER_USUARIOS:
            return { ...state, datos: action.payload, loading: false }
        case SUBIR_IMAGEN:
        case CAMBIA_IMAGEN:
        case ELIMINAR_IMAGEN:
        case ERR_SUBIR_IMAGEN:
        case ERR_ELIMINAR_IMAGEN:
        case ERR_CAMBIA_IMAGEN:
        case REGISTRO_ERROR:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}

//ACCIONES
export const obtenerUsuarios = () => async (dispatch, getState) => {

    dispatch({ type: USUARIOS_LOADING })

    Axios.get(`${backendUrl}/usuarios`)
        .then(res =>
            dispatch({
                type: OBTENER_USUARIOS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: REGISTRO_ERROR
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}

export const agregaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })

    Axios.post(`${backendUrl}/usuarios`, datos)
        .then(result => {
            dispatch({ type: REGISTER_SUCCESS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'))
            dispatch({
                type: REGISTRO_ERROR
            })
        })

}

export const actualizaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })

    Axios.put(`${backendUrl}/usuarios/${datos._id}`, datos)
        .then(result => {
            dispatch({ type: UPDATE_USUARIO, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTRO_ERROR
            })
        })

}


export const bajaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })

    Axios.delete(`${backendUrl}/usuarios/${datos._id}`)
        .then(result => {
            dispatch({ type: BORRA_USUARIO, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTRO_ERROR
            })
        })

}


export const subirImagen = (imagen) => async (dispatch, getState) => {
    const { usuario } = getState().auth

    Axios.post(`${backendUrl}/usuarios/imagen/${usuario._id}`, imagen)
        .then(result => {
            dispatch({ type: SUBIR_IMAGEN, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_SUBIR_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_SUBIR_IMAGEN'))
        })

}

export const EliminarImagen = (imagen) => async (dispatch, getState) => {
    const { usuario } = getState().auth

    Axios.post(`${backendUrl}/usuarios/imagen/borrar/${usuario._id}`, imagen)
        .then(result => {
            dispatch({ type: ELIMINAR_IMAGEN, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_ELIMINAR_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_ELIMINAR_IMAGEN'))
        })

}

export const cambiarImagen = (imagen) => async (dispatch, getState) => {
    const { usuario } = getState().auth

    Axios.put(`${backendUrl}/usuarios/imagen/${usuario._id}`, imagen)
        .then(result => {
            dispatch({ type: CAMBIA_IMAGEN, payload: result.data })

        })
        .catch(err => {
            dispatch({ type: ERR_CAMBIA_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_CAMBIA_IMAGEN'))
        })

}
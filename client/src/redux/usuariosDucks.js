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
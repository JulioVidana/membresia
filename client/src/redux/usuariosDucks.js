import Axios from 'axios'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'
const host = 'http://localhost:3001'

//  CONSTANTES
const dataInicial = {
    datos: [],
    loading: false,
    regis: true
}

//  TYPES
const USUARIOS_LOADING = 'USER_LOADING'
const OBTENER_USUARIOS = 'OBTENER_USUARIOS'
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";
const REGISTRO_ERROR = 'REGISTRO_ERROR';
const UPDATE_USUARIO = 'UPDATE_USUARIO';
const BORRA_USUARIO = 'BORRA_USUARIO'


//REDUCER
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case USUARIOS_LOADING:
            return { ...state, loading: true }
        case OBTENER_USUARIOS:
            return { ...state, datos: action.payload, loading: false }
        case REGISTER_SUCCESS:
        case UPDATE_USUARIO:
        case BORRA_USUARIO:
            return { ...state, ...action.payload, loading: false, regis: true }
        case REGISTRO_ERROR:
        case REGISTER_FAIL:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}

//ACCIONES
export const obtenerUsuarios = () => async (dispatch, getState) => {

    dispatch({ type: USUARIOS_LOADING })

    Axios.get(`${host}/api/usuarios`)
        .then(res =>
            dispatch({
                type: OBTENER_USUARIOS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: REGISTRO_ERROR
            });
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch(addNotificacion(err.message, true, 'error'))
        })

}

export const agregaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })
    console.log('iglesias', getState().iglesias.datos)
    Axios.post(`${host}/api/usuarios/register`, datos)
        .then(result => {
            //alert("chido")
            dispatch({ type: REGISTER_SUCCESS, payload: result.data })

            Axios.get(`${host}/api/usuarios`)
                .then(res =>
                    dispatch({ type: OBTENER_USUARIOS, payload: res.data }))


        })
        .catch(err => {
            //console.log(err.response)
            dispatch(addNotificacion(err.message, true, 'error'))
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'),);
            dispatch({
                type: REGISTRO_ERROR
            });
        })

}

export const actualizaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })
    //console.log(datos)
    Axios.post(`${host}/api/usuarios/update`, datos)
        .then(result => {
            //alert("chido")
            dispatch({ type: UPDATE_USUARIO, payload: result.data })

            Axios.get(`${host}/api/usuarios`)
                .then(res =>
                    dispatch({ type: OBTENER_USUARIOS, payload: res.data }))


        })
        .catch(err => {
            dispatch(addNotificacion(err.message, true, 'error'))
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTRO_ERROR
            });
        })

}


export const bajaUsuario = (datos) => async (dispatch, getState) => {
    dispatch({ type: USUARIOS_LOADING })
    //console.log(datos)
    Axios.post(`${host}/api/usuarios/baja`, datos)
        .then(result => {
            //alert("chido")
            dispatch({ type: BORRA_USUARIO, payload: result.data })

            Axios.get(`${host}/api/usuarios`)
                .then(res =>
                    dispatch({ type: OBTENER_USUARIOS, payload: res.data }))


        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTRO_ERROR
            });
        })

}
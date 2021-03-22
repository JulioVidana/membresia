import Axios from 'axios';
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'


//  CONSTANTES
const dataInicial = {
    datos: [],
    mensaje: "",
    loading: false,
    regis: true
};


// ACTION TYPES
const IGLESIAS_LOADING = 'IGLESIAS_LOADING';
const OBTENER_IGLESIAS = 'OBTENER_IGLESIAS';
const AGREGAR_IGLESIA = 'AGREGAR_IGLESIA';
const REGISTRO_ERROR = 'ERROR/iglesias';
const ACTUALIZA_IGLESIA = 'ACTUALIZA_IGLESIA';
const BORRA_IGLESIA = 'BORRA_IGLESIA'



//  REDUCER
export default function iglesiasReducer(state = dataInicial, action) {
    switch (action.type) {
        case IGLESIAS_LOADING:
            return { ...state, loading: true }
        case OBTENER_IGLESIAS:
            return { ...state, datos: action.payload, loading: false }
        case AGREGAR_IGLESIA:
            return { ...state, ...action.payload, loading: false, regis: true }
        case BORRA_IGLESIA:
        case ACTUALIZA_IGLESIA:
            return { ...state, ...action.payload, loading: false, regis: true }
        case REGISTRO_ERROR:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}

// ACCIONES
export const obtenerIglesias = () => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })

    Axios.get(`${backendUrl}/api/iglesias`)
        .then(res =>
            dispatch({
                type: OBTENER_IGLESIAS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: REGISTRO_ERROR
            });
            dispatch(returnErrors(err, ''))
            dispatch(addNotificacion(err.message, true, 'error'))
            //dispatch(returnErrors(err.response.data, err.response.status));
        })


}

export const agregarIglesia = (datos) => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })
    Axios.post(`${backendUrl}/api/iglesias/add`, datos)
        .then(result => {
            dispatch({ type: AGREGAR_IGLESIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: REGISTRO_ERROR });
            //dispatch(addNotificacion(err.message, true, 'error'))

        })

}


export const actualizaIglesia = (datos) => async (dispatch, getState) => {
    dispatch({ type: IGLESIAS_LOADING })
    Axios.post(`${backendUrl}/api/iglesias/update`, datos)
        .then(result => {
            dispatch({ type: ACTUALIZA_IGLESIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTRO_ERROR
            });
        })
}

export const borraIglesia = (datos) => async (dispatch, getState) => {

    Axios.post(`${backendUrl}/api/iglesias/delete`, datos)
        .then(result => {
            dispatch({ type: BORRA_IGLESIA, payload: result.data })

            Axios.get(`${backendUrl}/api/iglesias`)
                .then(res =>
                    dispatch({ type: OBTENER_IGLESIAS, payload: res.data }))

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTRO_ERROR
            });
        })


}
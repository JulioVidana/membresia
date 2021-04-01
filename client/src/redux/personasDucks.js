import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'

//CONSTANTES
const dataInicial = {
    personas: [],
    loading: false,
    regis: true
}

//ACTION TYPES
const PERSONAS_LOADING = 'PERSONAS_LOADING'
const OBTENER_PERSONAS = 'OBTENER_PERSONAS'
const OBTENER_INACTIVOS = 'OBTENER_INACTIVOS'
const AGREGA_PERSONA = 'AGREGA_PERSONA'
const ERROR_AGREGA_PERSONA = 'ERROR_AGREGA_PERSONA'
const ACTUALIZA_PERSONA = 'ACTUALIZA_PERSONA'
const ERROR_ACTUALIZA_PERSONA = 'ERROR_ACTUALIZA_PERSONA'
const ERROR_OBTENER_PERSONAS = 'ERROR_OBTENER_PERSONAS'



//REDUCER
export default function personasReducer(state = dataInicial, action) {
    switch (action.type) {
        case PERSONAS_LOADING:
            return { ...state, loading: true }
        case OBTENER_INACTIVOS:
        case OBTENER_PERSONAS:
            return { ...state, personas: action.payload, loading: false }
        case ACTUALIZA_PERSONA:
        case AGREGA_PERSONA:
            return { ...state, ...action.payload, loading: false, regis: true }
        case ERROR_OBTENER_PERSONAS:
        case ERROR_ACTUALIZA_PERSONA:
        case ERROR_AGREGA_PERSONA:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}


//ACCIONES
export const obtenerPersonas = (iglesia) => async (dispatch, getState) => {
    dispatch({ type: PERSONAS_LOADING })
    Axios.get(`${backendUrl}/api/personas/${iglesia._id}`)
        .then(result => {
            dispatch({ type: OBTENER_PERSONAS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_OBTENER_PERSONAS });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

export const agregaPersona = (datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    //console.log({ datos })
    Axios.post(`${backendUrl}/api/personas/add`, datos)
        .then(result => {
            dispatch({ type: AGREGA_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_AGREGA_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}


export const actualizaPersona = (datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.post(`${backendUrl}/api/personas/update`, datos)
        .then(result => {
            dispatch({ type: ACTUALIZA_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_ACTUALIZA_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

//ACCIONES
export const obtenerInactivos = (iglesia) => async (dispatch, getState) => {
    dispatch({ type: PERSONAS_LOADING })
    Axios.get(`${backendUrl}/api/personas/inactivos/${iglesia._id}`)
        .then(result => {
            dispatch({ type: OBTENER_INACTIVOS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_OBTENER_PERSONAS });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'

//CONSTANTES
const dataInicial = {
    personas: [],
    loading: false,
    regis: true
}

//ACTION TYPES
const PERSONAS_LOADING = '@personas/loading'
const OBTENER_PERSONAS = '@personas/getPersonas'
const OBTENER_INACTIVOS = '@personas/getInactivos'
const AGREGA_PERSONA = '@personas/addPersonas'
const ERROR_AGREGA_PERSONA = '@personas/error/addPersona'
const ACTUALIZA_PERSONA = '@personas/updatePersona'
const ERROR_ACTUALIZA_PERSONA = '@personas/error/updatePersonas'
const ERROR_OBTENER_PERSONAS = '@personas/error/getPersonas'



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
    Axios.get(`${backendUrl}/personas/${iglesia._id}`)
        .then(result => {
            dispatch({ type: OBTENER_PERSONAS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_OBTENER_PERSONAS'))
            dispatch({ type: ERROR_OBTENER_PERSONAS })

        })

}

export const agregaPersona = (datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.post(`${backendUrl}/personas/add`, datos)
        .then(result => {
            dispatch({ type: AGREGA_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_AGREGA_PERSONA'))
            dispatch({ type: ERROR_AGREGA_PERSONA })
        })

}


export const actualizaPersona = (datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.post(`${backendUrl}/personas/update`, datos)
        .then(result => {
            dispatch({ type: ACTUALIZA_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_ACTUALIZA_PERSONA'))
            dispatch({ type: ERROR_ACTUALIZA_PERSONA })
        })

}

//ACCIONES
export const obtenerInactivos = (iglesia) => async (dispatch, getState) => {
    dispatch({ type: PERSONAS_LOADING })
    Axios.get(`${backendUrl}/personas/inactivos/${iglesia._id}`)
        .then(result => {
            dispatch({ type: OBTENER_INACTIVOS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_OBTENER_PERSONAS'))
            dispatch({ type: ERROR_OBTENER_PERSONAS })
        })

}

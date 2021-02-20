import Axios from 'axios';
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'
const host = 'http://localhost:3001';

//CONSTANTES
const dataInicial = {
    personas: [],
    loading: false,
    regis: true
}

//ACTION TYPES
const PERSONAS_LOADING = 'PERSONAS_LOADING'
const OBTENER_PERSONAS = 'OBTENER_PERSONAS'
const AGREGA_PERSONA = 'AGREGA_PERSONA'
const ERROR_AGREGA_PERSONA = 'ERROR_AGREGA_PERSONA'
const ACTUALIZA_PERSONA = 'ACTUALIZA_PERSONA'
const ERROR_ACTUALIZA_PERSONA = 'ERROR_ACTUALIZA_PERSONA'


//REDUCER
export default function personasReducer(state = dataInicial, action) {
    switch (action.type) {
        case PERSONAS_LOADING:
            return { ...state, loading: true }
        case OBTENER_PERSONAS:
            return { ...state, personas: action.payload, loading: false }
        case ACTUALIZA_PERSONA:
        case AGREGA_PERSONA:
            return { ...state, ...action.payload, loading: false, regis: true }
        case ERROR_ACTUALIZA_PERSONA:
        case ERROR_AGREGA_PERSONA:
            return { ...state, loading: false, regis: false }
        default:
            return state
    }
}


//ACCIONES

export const agregaPersona = (datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.post(`${host}/api/personas/add`, datos)
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
    Axios.post(`${host}/api/personas/update`, datos)
        .then(result => {
            dispatch({ type: ACTUALIZA_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_ACTUALIZA_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}
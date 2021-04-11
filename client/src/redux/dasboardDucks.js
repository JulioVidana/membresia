import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'

//CONSTANTES
const dataInicial = {
    personas: [],
    loading: false,
    bautismos: []
}

//ACTION TYPES
const LOADING = '@dashboard/loading'
const GET_PERSONAS = '@dashboard/getPersonas'
const ERROR_GET_PERSONAS = '@dashboard/getPersonas:Error'
const GET_BAUTISMOS = '@dashboard/getBautismos'
const ERROR_GET_BAUTISMOS = '@dashboard/getBautismos:Error'

//REDUCER
export default function personasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_PERSONAS:
            return { ...state, personas: action.payload, loading: false }
        case GET_BAUTISMOS:
            return { ...state, bautismos: action.payload, loading: false }
        case ERROR_GET_BAUTISMOS:
        case ERROR_GET_PERSONAS:
            return { ...state, loading: false }
        default:
            return state
    }
}

//ACCIONES
export const getPersonas = (iglesia) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    Axios.get(`${backendUrl}/api/personas/${iglesia._id}`)
        .then(result => {
            dispatch({ type: GET_PERSONAS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_GET_PERSONAS });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

//ACCIONES
export const getBautismos = (iglesia, year) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const datos = {
        year: year,
        idIglesia: iglesia._id
    }
    Axios.post(`${backendUrl}/api/rptpersonas/bautismos/`, datos)
        .then(result => {
            dispatch({ type: GET_BAUTISMOS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_GET_BAUTISMOS });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}
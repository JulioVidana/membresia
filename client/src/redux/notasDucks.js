import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'

const dataInicial = {
    nota: {},
    notas: [],
    notasGlobal: [],
    loading: false
}

const LOADING = 'LOADING_NOTAS'
const GET_NOTAS = 'GET_NOTAS'
const GET_NOTAS_GLOBAL = 'GET_NOTAS_GLOBAL'
const NUEVA_NOTA = 'NUEVA_NOTA'
const DELETE_NOTA = 'DELETE_NOTA'

//REDUCER
export default function notasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_NOTAS_GLOBAL:
            return { ...state, notasGlobal: action.payload, loading: false }
        case GET_NOTAS:
            return { ...state, notas: action.payload, loading: false }
        case NUEVA_NOTA:
            return { ...state, notas: action.payload, loading: false }
        case DELETE_NOTA:
            return { ...state, nota: {}, loading: false }
        default:
            return state
    }
}

//ACTIONS
export const traeNotas = (idPersona) => async (dispatch, getState) => {
    dispatch({ type: LOADING })

    Axios.get(`${backendUrl}/api/notas/${idPersona}`)
        .then(result => {
            dispatch({ type: GET_NOTAS, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_GET_NOTAS'));
            dispatch(addNotificacion(err.response.data.error, true, 'error'))
        })
}

export const nuevaNota = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING })

    Axios.post(`${backendUrl}/api/notas`, datos)
        .then(result => {
            dispatch({ type: NUEVA_NOTA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_GET_NOTAS'));
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}

export const borraNota = (idNota) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const idPersona = getState().personaDetalle.persona._id

    Axios.delete(`${backendUrl}/api/notas/${idNota}`)
        .then(() => {
            dispatch({ type: DELETE_NOTA })

            Axios.get(`${backendUrl}/api/notas/${idPersona}`)
                .then(result => {
                    dispatch({ type: GET_NOTAS, payload: result.data })
                })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_DELETE_NOTAS'));
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}

export const traeNotasGlobal = (idIglesia) => async (dispatch, getState) => {
    dispatch({ type: LOADING })

    Axios.get(`${backendUrl}/api/notas/global/${idIglesia}`)
        .then(result => {
            dispatch({ type: GET_NOTAS_GLOBAL, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_GET_NOTAS_GLOBAL'));
            dispatch(addNotificacion(err.response.data.error, true, 'error'))
        })
}

export const borraNotaGlobal = (idNota) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const idIglesia = getState().general.iglesia._id

    Axios.delete(`${backendUrl}/api/notas/${idNota}`)
        .then(() => {
            dispatch({ type: DELETE_NOTA })

            Axios.get(`${backendUrl}/api/notas/global/${idIglesia}`)
                .then(result => {
                    dispatch({ type: GET_NOTAS_GLOBAL, payload: result.data })
                })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_DELETE_NOTAS'));
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}
import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'


const dataInicial = {
    familia: {},
    familias: [],
    loading: false
}

const LOADING = 'LOADING_FAMILIA'
const GET_FAMILIA = 'GET_FAMILIA_PERSONA'
const POST_FAMILIA = 'AGREGA_FAMILIA_PERSONA'
const PUT_FAMILIA = 'ACTUALIZA_FAMILIA_PERSONA'
const DELETE_FAMILIA = 'DELETE_FAMILIA_PERSONA'
const ERR_GET_FAMILIA = 'ERR_GET_FAMILIA_PERSONA'
const ERR_POST_FAMILIA = 'ERR_POST_FAMILIA_PERSONA'
const ERR_PUT_FAMILIA = 'ERR_PUT_FAMILIA_PERSONA'
const ERR_DEL_FAMILIA = 'ERR_DEL_FAMILIA_PERSONA'
const RESET_FAMILIA = 'RESET_FAMILIA'

//REDUCER
export default function familiasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_FAMILIA:
            return { ...state, familia: action.payload, loading: false }
        case PUT_FAMILIA:
        case POST_FAMILIA:
            return { ...state, familia: action.payload, loading: false }
        case ERR_DEL_FAMILIA:
        case ERR_PUT_FAMILIA:
        case ERR_POST_FAMILIA:
        case ERR_GET_FAMILIA:
            return { ...state, loading: false }
        case DELETE_FAMILIA:
        case RESET_FAMILIA:
            return { ...state, familia: {}, loading: false }
        default:
            return state
    }
}

//ACTIONS
export const traeFamilia = (idFamilia) => async (dispatch, getState) => {

    dispatch({ type: LOADING })
    await Axios.get(`${backendUrl}/api/familias/${idFamilia}`)
        .then(result => {
            dispatch({ type: GET_FAMILIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_GET_FAMILIA_PERSONA'));
            //dispatch({ type: ERR_GET_FAMILIA_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))
        })

}
export const resetFamilia = () => (dispatch) => {
    dispatch({ type: RESET_FAMILIA })
}

export const agregaFamilia = (datos) => async (dispatch, getState) => {

    dispatch({ type: LOADING })
    await Axios.post(`${backendUrl}/api/familias`, datos)
        .then(result => {
            dispatch({ type: POST_FAMILIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_PUT_FAMILIA'));
            //dispatch({ type: ERR_POST_FAMILIA });
            dispatch(addNotificacion(err.message, true, 'error'))
        })

}

export const actualizaFamilia = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const { _id } = getState().familias.familia
    const persona = getState().personaDetalle.persona

    await Axios.put(`${backendUrl}/api/familias/${_id}`, datos)
        .then(result => {
            //check si todavía tiene familia la persona 
            Axios.get(`${backendUrl}/api/familias/persona/${persona._id}`)
                .then(res => {
                    res.data
                        ?
                        dispatch({ type: PUT_FAMILIA, payload: result.data })
                        :
                        dispatch({ type: RESET_FAMILIA })
                })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_PUT_FAMILIA'));
            //dispatch({ type: ERR_PUT_FAMILIA });
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}

export const eliminaFamilia = (idFamilia) => async (dispatch) => {
    dispatch({ type: LOADING })
    await Axios.delete(`${backendUrl}/api/familias/${idFamilia}`)
        .then(result => {
            dispatch({ type: DELETE_FAMILIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_DELETE_FAMILIA'));
            //dispatch({ type: ERR_DEL_FAMILIA });
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}

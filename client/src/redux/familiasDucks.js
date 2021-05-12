import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'

const dataInicial = {
    familia: {},
    familias: [],
    loading: false
}

const LOADING = '@familias/loading'
const GET_FAMILIA = '@familias/getFamilia'
const POST_FAMILIA = '@familias/addFamilia'
const PUT_FAMILIA = '@familias/updateFamilia'
const DELETE_FAMILIA = '@familias/deleteFamilia'
const ERR_GET_FAMILIA = '@familias/error/getFamilia'
const ERR_POST_FAMILIA = '@familias/error/addFamilia'
const ERR_PUT_FAMILIA = '@familias/error/updateFamilia'
const ERR_DEL_FAMILIA = '@familias/error/deleteFamilia'
const RESET_FAMILIA = '@familias/resetFamilia'

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
    await Axios.get(`${backendUrl}/familias/${idFamilia}`)
        .then(result => {
            dispatch({ type: GET_FAMILIA, payload: result.data })
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'ERR_GET_FAMILIA_PERSONA')
            )
            dispatch({ type: ERR_GET_FAMILIA })
        })

}
export const resetFamilia = () => (dispatch) => {
    dispatch({ type: RESET_FAMILIA })
}

export const agregaFamilia = (datos) => async (dispatch, getState) => {

    dispatch({ type: LOADING })
    await Axios.post(`${backendUrl}/familias`, datos)
        .then(result => {
            dispatch({ type: POST_FAMILIA, payload: result.data })
            dispatch(addNotificacion('Se agregó Familia', true, 'success'))
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'ERR_PUT_FAMILIA')
            )
            dispatch({ type: ERR_POST_FAMILIA });
        })

}

export const actualizaFamilia = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const { _id } = getState().familias.familia
    const persona = getState().personaDetalle.persona

    //console.log(datos)

    await Axios.put(`${backendUrl}/familias/${_id}`, datos)
        .then(result => {
            //check si todavía tiene familia la persona 
            Axios.get(`${backendUrl}/familias/persona/${persona._id}`)
                .then(res => {
                    if (res.data) {
                        dispatch({ type: PUT_FAMILIA, payload: result.data })
                        dispatch(addNotificacion('Se actualizó Familia', true, 'success'))

                    } else {
                        dispatch({ type: RESET_FAMILIA })
                        dispatch(addNotificacion('Se actualizó Familia', true, 'success'))
                    }

                })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_PUT_FAMILIA'));
            dispatch({ type: ERR_PUT_FAMILIA })
        })
}

export const eliminaFamilia = (idFamilia) => async (dispatch) => {
    dispatch({ type: LOADING })
    await Axios.delete(`${backendUrl}/familias/${idFamilia}`)
        .then(result => {
            dispatch({ type: DELETE_FAMILIA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_DELETE_FAMILIA'))
            dispatch({ type: ERR_DEL_FAMILIA })
        })
}

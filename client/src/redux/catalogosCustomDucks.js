import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'

//  CONSTANTES
const dataInicial = {
    catalogo: []
}


const GET_TIPO = '@catalogosCustom/getTipo'
const NUEVO_TIPO = '@catalogosCustom/nuevoTipo'
const BORRAR_TIPO = '@catalogosCustom/borrarTipo'
const UPDATE_TIPO = '@catalogosCustom/actualizaTipo'
const ERROR_CATALOGO = '@catalogosCustom/error/tipo'


//REDUCER
export default function catalogosCustomReducer(state = dataInicial, action) {
    switch (action.type) {
        case BORRAR_TIPO:
        case UPDATE_TIPO:
        case NUEVO_TIPO:
        case GET_TIPO:
            return { ...state, catalogo: action.payload, loading: false }
        case ERROR_CATALOGO:
            return { ...state, loading: false }
        default:
            return state
    }
}

//ACTIONS
export const traeCatalogo = (tipoCatalogo) => async (dispatch, getState) => {
    const { iglesia } = getState().general

    Axios.get(`${backendUrl}/${tipoCatalogo}/${iglesia._id}`)
        .then(res =>
            dispatch({
                type: GET_TIPO,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ERROR_CATALOGO
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })


}

export const nuevoTipo = (tipoCatalogo, datos) => async (dispatch) => {

    Axios.post(`${backendUrl}/${tipoCatalogo}`, datos)
        .then(res =>
            dispatch({
                type: NUEVO_TIPO,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: ERROR_CATALOGO
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}

export const borrarTipo = (tipoCatalogo, datos) => async (dispatch, getState) => {

    Axios.delete(`${backendUrl}/${tipoCatalogo}/${datos._id}`)
        .then(res =>
            dispatch({
                type: BORRAR_TIPO,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: ERROR_CATALOGO
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}

export const actualizarTipo = (tipoCatalogo, datos) => async (dispatch, getState) => {

    Axios.put(`${backendUrl}/${tipoCatalogo}/${datos._id}`, datos)
        .then(res =>
            dispatch({
                type: UPDATE_TIPO,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: ERROR_CATALOGO
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}

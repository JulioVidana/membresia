import { addNotificacion } from './notifyDucks'

//  CONSTANTES
const dataInicial = {
    msg: {},
    status: null,
    id: null
}

//  TYPES
const GET_ERRORS = "GET_ERRORS"
const CLEAR_ERRORS = "CLEAR_ERRORS"

//REDUCER
export default function erroresReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_ERRORS:
            return { msg: action.payload.msg, status: action.payload.status, id: action.payload.id }
        case CLEAR_ERRORS:
            return { msg: {}, status: null, id: null }
        default:
            return state
    }
}

//ACCIONES
export const returnErrors = (msg, status, id) => async (dispatch, getState) => {
    dispatch(addNotificacion(msg.msg, true, 'error'))
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}
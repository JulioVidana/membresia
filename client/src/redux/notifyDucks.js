//  CONSTANTES
const dataInicial = {
    msg: '',
    isOpen: false,
    type: '',
}

//  TYPES
const ADD_NOTIFICACION = "ADD_NOTIFICACION";
const CLEAR_NOTIFICACION = "CLEAR_NOTIFICACION";

//REDUCER
export default function erroresReducer(state = dataInicial, action) {
    switch (action.type) {
        case ADD_NOTIFICACION:
            return { ...state, msg: action.payload.msg, isOpen: action.payload.isOpen, type: action.payload.type }
        case CLEAR_NOTIFICACION:
            return { msg: '', isOpen: false, type: '' }
        default:
            return state
    }
}


//ACCIONES

/**
 * Tipos de alertas: error, warning, success, info
 */
export const addNotificacion = (msg, isOpen, type) => async (dispatch, getState) => {
    dispatch({
        type: ADD_NOTIFICACION,
        payload: { msg, isOpen, type }
    });
};

export const clearNotificacion = () => {
    return {
        type: CLEAR_NOTIFICACION
    };
};
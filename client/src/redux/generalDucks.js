//  CONSTANTES
const iglesia = localStorage.getItem('iglesia')
const dataInicial = {
    menu: [],
    iglesia: iglesia ? JSON.parse(iglesia) : {}
}

//  TYPES
const CARGA_MENU = '@global/cargaMenu'
const CARGA_IGLESIA = '@global/cargaIglesia'


// REDUCER
export default function generalReducer(state = dataInicial, action) {
    switch (action.type) {
        case CARGA_MENU:
            return { ...state, menu: action.payload }
        case CARGA_IGLESIA:
            return { ...state, iglesia: action.payload }
        default:
            return state
    }
}

//ACCIONES
export const cargaMenuAccion = (datos) => async (dispatch, getState) => {

    dispatch({ type: CARGA_MENU, payload: datos })

}

//ACCIONES
export const cargaIglesia = (datos) => async (dispatch, getState) => {

    dispatch({ type: CARGA_IGLESIA, payload: datos })

}
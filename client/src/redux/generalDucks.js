//  CONSTANTES
const dataInicial = {
    menu: [],
    iglesia: { _id: "6024878b19e804be07b07462", nombre: "1a de Chandler" }
}

//  TYPES
const CARGA_MENU = 'CARGA_MENU'


// REDUCER
export default function generalReducer(state = dataInicial, action) {
    switch (action.type) {
        case CARGA_MENU:
            return { ...state, menu: action.payload }
        default:
            return state
    }
}

//ACCIONES
export const cargaMenuAccion = (datos) => async (dispatch, getState) => {

    dispatch({ type: CARGA_MENU, payload: datos })

}
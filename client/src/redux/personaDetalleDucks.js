//CONSTANTES
const dataInicial = {
    persona: []
}

//TYPES
const CARGA_PERSONA = 'CARGA_PERSONA'


//REDUCER
export default function personaDetReducer(state = dataInicial, action) {
    switch (action.type) {
        case CARGA_PERSONA:
            return { ...state, persona: action.payload }
        default:
            return state
    }
}

//ACCIONES
export const cargaPersona = (datos) => async (dispatch, getState) => {
    dispatch({ type: CARGA_PERSONA, payload: datos })
}
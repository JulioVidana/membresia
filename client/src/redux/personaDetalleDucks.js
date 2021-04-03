import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'
import { traeFamilia, resetFamilia } from './familiasDucks'
import { traeNotas } from './notasDucks'

//CONSTANTES
const dataInicial = {
    persona: {},
    loading: false
}

//TYPES
const CARGA_PERSONA = 'CARGA_PERSONA'
const TRAE_PERSONA = 'TRAE_PERSONA'
const ADD_TIPOMIEMBRO = 'ADD_TIPOMIEMBRO'
const ADD_INACTIVO = 'ADD_INACTIVO'
const ADD_BAUTISMO = 'ADD_BAUTISMO'
const BORRAR_PERSONA = 'BORRAR_PERSONA'
const ERROR_AGREGA_TIPOMIEMBRO = 'ERROR_AGREGA_TIPOMIEMBRO'
const ERR_INACTIVO = 'ERR_INACTIVO'
const ERR_BORRAR_PERSONA = 'ERR_BORRAR_PERSONA'
const ERR_ADD_BAUTISMO = 'ERR_ADD_BAUTISMO'
const SUBIR_IMAGEN = 'SUBIR_IMAGEN'
const ERR_SUBIR_IMAGEN = 'ERR_SUBIR_IMAGEN'
const ELIMINAR_IMAGEN = 'ELIMINAR_IMAGEN'
const ERR_ELIMINAR_IMAGEN = 'ERR_ELIMINAR_IMAGEN'
const CAMBIA_IMAGEN = 'CAMBIA_IMAGEN'
const ERR_CAMBIA_IMAGEN = 'ERR_CAMBIA_IMAGEN'

//REDUCER
export default function personaDetReducer(state = dataInicial, action) {
    switch (action.type) {
        case TRAE_PERSONA:
        case CARGA_PERSONA:
            return { ...state, persona: action.payload }
        case CAMBIA_IMAGEN:
        case ELIMINAR_IMAGEN:
        case SUBIR_IMAGEN:
        case ADD_BAUTISMO:
        case BORRAR_PERSONA:
        case ADD_INACTIVO:
        case ADD_TIPOMIEMBRO:
            return { ...state, ...action.payload, loading: false }
        case ERR_CAMBIA_IMAGEN:
        case ERR_ELIMINAR_IMAGEN:
        case ERR_ADD_BAUTISMO:
        case ERR_BORRAR_PERSONA:
        case ERR_INACTIVO:
        case ERROR_AGREGA_TIPOMIEMBRO:
            return { ...state, loading: false }
        default:
            return state
    }
}

//ACCIONES
export const cargaPersona = (datos) => async (dispatch, getState) => {
    dispatch({ type: CARGA_PERSONA, payload: datos })
    datos.familia ? dispatch(traeFamilia(datos.familia)) : dispatch(resetFamilia())
    dispatch(traeNotas(datos._id))
}

export const traePersona = (datos) => async (dispatch) => {
    console.log('id', datos._id)
    await Axios.get(`${backendUrl}/api/personas/persona/${datos._id}`)
        .then(result => {
            dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            //dispatch({ type: ERROR_AGREGA_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))
        })
}

export const actualizaTipoMiembro = (id, datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.put(`${backendUrl}/api/personas/tipomiembro/${id}`, datos)
        .then(result => {
            dispatch({ type: ADD_TIPOMIEMBRO, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERROR_AGREGA_TIPOMIEMBRO });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

export const cambiaEstatus = (datos) => async (dispatch, getState) => {

    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/api/personas/estatus/${persona._id}`, datos)
        .then(result => {
            dispatch({ type: ADD_INACTIVO, payload: result.data })

            Axios.get(`${backendUrl}/api/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_INACTIVO });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}
export const addBautismo = (datos) => async (dispatch, getState) => {

    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/api/personas/bautismo/${persona._id}`, datos)
        .then(result => {
            dispatch({ type: ADD_BAUTISMO, payload: result.data })

            Axios.get(`${backendUrl}/api/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_ADD_BAUTISMO });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}
export const borrarPersona = (id) => async (dispatch, getState) => {


    Axios.delete(`${backendUrl}/api/personas/borrar/${id}`)
        .then(result => {
            dispatch({ type: BORRAR_PERSONA, payload: result.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_BORRAR_PERSONA });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}


export const subirImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.post(`${backendUrl}/api/avatars/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: SUBIR_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/api/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_SUBIR_IMAGEN });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

export const EliminarImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.post(`${backendUrl}/api/avatars/borrar/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: ELIMINAR_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/api/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_ELIMINAR_IMAGEN });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}

export const cambiarImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/api/avatars/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: CAMBIA_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/api/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTRO_ERROR'));
            dispatch({ type: ERR_CAMBIA_IMAGEN });
            dispatch(addNotificacion(err.message, true, 'error'))

        })

}
import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'
import { traeFamilia, resetFamilia } from './familiasDucks'
import { traeNotas } from './notasDucks'
import { obtenerPersonas } from './personasDucks'
//CONSTANTES
const dataInicial = {
    persona: {},
    loading: false
}

//TYPES
const CARGA_PERSONA = '@detPersona/loading'
const TRAE_PERSONA = '@detPersona/getPersona'
const ADD_TIPOMIEMBRO = '@detPersona/updateTipoMiembro'
const ADD_INACTIVO = '@detPersona/updateInactivo'
const ADD_BAUTISMO = '@detPersona/updateBautismo'
const BORRAR_PERSONA = '@detPersona/deletePersona'
const SUBIR_IMAGEN = '@detPersona/uploadImage'
const CAMBIA_IMAGEN = '@detPersona/updateImage'
const ELIMINAR_IMAGEN = '@detPersona/deleteImage'
const ERROR_AGREGA_TIPOMIEMBRO = '@detPersona/error/updateTipoMiembro'
const ERR_INACTIVO = '@detPersona/error/inactivo'
const ERR_BORRAR_PERSONA = '@detPersona/error/deletePersona'
const ERR_ADD_BAUTISMO = '@detPersona/error/updateBautismo'
const ERR_SUBIR_IMAGEN = '@detPersona/error/uploadImage'
const ERR_ELIMINAR_IMAGEN = '@detPersona/error/deleteImage'
const ERR_CAMBIA_IMAGEN = '@detPersona/error/updateImage'

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
    //console.log('id', datos._id)
    await Axios.get(`${backendUrl}/personas/persona/${datos._id}`)
        .then(result => {
            dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR'));
        })
}

export const actualizaTipoMiembro = (id, datos) => async (dispatch, getState) => {
    //dispatch({ type: PERSONAS_LOADING })
    Axios.put(`${backendUrl}/personas/tipomiembro/${id}`, datos)
        .then(result => {
            dispatch({ type: ADD_TIPOMIEMBRO, payload: result.data })
        })
        .catch(err => {
            dispatch({ type: ERROR_AGREGA_TIPOMIEMBRO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_AGREGA_TIPOMIEMBRO'))
        })

}

export const cambiaEstatus = (datos) => async (dispatch, getState) => {

    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/personas/estatus/${persona._id}`, datos)
        .then(result => {
            dispatch({ type: ADD_INACTIVO, payload: result.data })

            Axios.get(`${backendUrl}/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch({ type: ERR_INACTIVO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_INACTIVO'))
        })

}
export const addBautismo = (datos) => async (dispatch, getState) => {

    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/personas/bautismo/${persona._id}`, datos)
        .then(result => {
            dispatch({ type: ADD_BAUTISMO, payload: result.data })

            Axios.get(`${backendUrl}/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })

        })
        .catch(err => {
            dispatch({ type: ERR_ADD_BAUTISMO })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_ADD_BAUTISMO'))
        })

}
export const borrarPersona = (id) => async (dispatch, getState) => {
    const { imagen } = getState().personaDetalle.persona
    const iglesia = getState().general.iglesia

    Axios.post(`${backendUrl}/personas/delete/${id}`, imagen)
        .then(result => {
            dispatch({ type: BORRAR_PERSONA, payload: result.data })

            dispatch(obtenerPersonas(iglesia))
        })
        .catch(err => {
            dispatch({ type: ERR_BORRAR_PERSONA })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_BORRAR_PERSONA'))
        })

}


export const subirImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.post(`${backendUrl}/avatars/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: SUBIR_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch({ type: ERR_SUBIR_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_SUBIR_IMAGEN'))
        })

}

export const EliminarImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.post(`${backendUrl}/avatars/borrar/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: ELIMINAR_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch({ type: ERR_ELIMINAR_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_ELIMINAR_IMAGEN'))
        })

}

export const cambiarImagen = (imagen) => async (dispatch, getState) => {
    const { persona } = getState().personaDetalle

    Axios.put(`${backendUrl}/avatars/${persona._id}`, imagen)
        .then(result => {
            dispatch({ type: CAMBIA_IMAGEN, payload: result.data })

            Axios.get(`${backendUrl}/personas/persona/${persona._id}`)
                .then(result => {
                    dispatch({ type: TRAE_PERSONA, payload: result.data[0] })
                })
        })
        .catch(err => {
            dispatch({ type: ERR_CAMBIA_IMAGEN })
            dispatch(returnErrors(err.response.data, err.response.status, 'ERR_CAMBIA_IMAGEN'))
        })

}
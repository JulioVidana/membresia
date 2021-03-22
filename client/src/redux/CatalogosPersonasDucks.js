import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'


//  CONSTANTES
const dataInicial = {
    edoCivil: [],
    escolaridad: [],
    grupoEdades: [],
    tipoMiembro: [],
    generos: [{ value: 'Mujer', label: 'Mujer' }, { value: 'Hombre', label: 'Hombre' }],
    motivoBaja: [
        {
            id: 1,
            motivo: 'Sin motivo'
        },
        {
            id: 2,
            motivo: 'Nueva Iglesia'
        },
        {
            id: 4,
            motivo: 'Traslado'
        },
        {
            id: 3,
            motivo: 'Fallecimiento'
        }
    ],
    loading: false
};

//ACTION TYPES
const CATALOGOS_LOADING = 'CATALOGOS_LOADING'
const GET_ESTADO_CVIL = 'GET_ESTADO_CVIL'
const GET_ESCOLARIDAD = 'GET_ESCOLARIDAD'
const GET_EDADES = 'GET_EDADES'
const GET_TIPOMIEMBROS = 'GET_TIPOMIEMBROS'
const ESTADO_ERROR = 'ESTADO_CIVIL_ERROR'
const ESCOLARIDAD_ERROR = 'ESCOLARIDAD_ERROR'
const EDADES_ERROR = 'EDADES_ERROR'
const ERROR_TIPOMIEMBROS = 'ERROR_TIPOMIEMBROS'

//REDUCER
export default function catalogosPersonasReducer(state = dataInicial, action) {
    switch (action.type) {
        case CATALOGOS_LOADING:
            return { ...state, loading: true }
        case GET_ESTADO_CVIL:
            return { ...state, edoCivil: action.payload, loading: false }
        case GET_ESCOLARIDAD:
            return { ...state, escolaridad: action.payload, loading: false }
        case GET_EDADES:
            return { ...state, grupoEdades: action.payload, loading: false }
        case GET_TIPOMIEMBROS:
            return { ...state, tipoMiembro: action.payload, loading: false }
        case ERROR_TIPOMIEMBROS:
        case EDADES_ERROR:
        case ESTADO_ERROR:
        case ESCOLARIDAD_ERROR:
            return { ...state, loading: false }
        default:
            return state
    }
}


//ACTIONS
export const obtenerCatalogosPersonas = () => async (dispatch, getState) => {

    const { iglesia } = getState().general
    //console.log({ iglesia })
    dispatch({ type: CATALOGOS_LOADING })

    Axios.get(`${backendUrl}/api/catalogos/edocivil`)
        .then(res =>
            dispatch({
                type: GET_ESTADO_CVIL,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ESTADO_ERROR
            });
            dispatch(returnErrors(err, ''))
            dispatch(addNotificacion(err.message, true, 'error'))
        })

    Axios.get(`${backendUrl}/api/catalogos/escolaridad`)
        .then(res =>
            dispatch({
                type: GET_ESCOLARIDAD,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ESCOLARIDAD_ERROR
            });
            dispatch(returnErrors(err, ''))
            dispatch(addNotificacion(err.message, true, 'error'))
        })

    Axios.get(`${backendUrl}/api/catalogos/edades`)
        .then(res =>
            dispatch({
                type: GET_EDADES,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: EDADES_ERROR
            });
            dispatch(returnErrors(err, ''))
            dispatch(addNotificacion(err.message, true, 'error'))
        })

    Axios.get(`${backendUrl}/api/catalogos/tipomiembros/${iglesia._id}`)
        .then(res =>
            dispatch({
                type: GET_TIPOMIEMBROS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ERROR_TIPOMIEMBROS
            });
            dispatch(returnErrors(err, ''))
            dispatch(addNotificacion(err.message, true, 'error'))
        })

}
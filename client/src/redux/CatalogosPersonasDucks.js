import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors } from './erroresDucks'


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
}

//ACTION TYPES
const CATALOGOS_LOADING = '@catalogos/Loading'
const GET_ESTADO_CVIL = '@catalogos/getEstadoCivil'
const GET_ESCOLARIDAD = '@catalogos/getEscolaridad'
const GET_EDADES = '@catalogos/getEdades'
const GET_TIPOMIEMBROS = '@catalogos/getTipoMiembros'
const ESTADO_ERROR = '@catalogos/error/estadocivil'
const ESCOLARIDAD_ERROR = '@catalogos/error/escolaridad'
const EDADES_ERROR = '@catalogos/error/edades'
const ERROR_TIPOMIEMBROS = '@catalogos/error/tipoMiembros'

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

    Axios.get(`${backendUrl}/catalogos/edocivil`)
        .then(res =>
            dispatch({
                type: GET_ESTADO_CVIL,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ESTADO_ERROR
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

    Axios.get(`${backendUrl}/catalogos/escolaridad`)
        .then(res =>
            dispatch({
                type: GET_ESCOLARIDAD,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ESCOLARIDAD_ERROR
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

    Axios.get(`${backendUrl}/catalogos/edades`)
        .then(res =>
            dispatch({
                type: GET_EDADES,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: EDADES_ERROR
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

    Axios.get(`${backendUrl}/catalogos/tipomiembros/${iglesia._id}`)
        .then(res =>
            dispatch({
                type: GET_TIPOMIEMBROS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: ERROR_TIPOMIEMBROS
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}
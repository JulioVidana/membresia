import Axios from 'axios';
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'
const host = 'http://localhost:3001';


//  CONSTANTES
const dataInicial = {
    edoCivil: [],
    escolaridad: [],
    grupoEdades: [],
    generos: [{ value: 'Feminino', label: 'Feminino' }, { value: 'Masculino', label: 'Masculino' }],
    loading: false
};

//ACTION TYPES
const CATALOGOS_LOADING = 'CATALOGOS_LOADING';
const GET_ESTADO_CVIL = 'GET_ESTADO_CVIL';
const GET_ESCOLARIDAD = 'GET_ESCOLARIDAD';
const GET_EDADES = 'GET_EDADES';
const ESTADO_ERROR = 'ESTADO_CIVIL_ERROR';
const ESCOLARIDAD_ERROR = 'ESCOLARIDAD_ERROR';
const EDADES_ERROR = 'EDADES_ERROR';

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
    dispatch({ type: CATALOGOS_LOADING })

    Axios.get(`${host}/api/catalogos/edocivil`)
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

    Axios.get(`${host}/api/catalogos/escolaridad`)
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

    Axios.get(`${host}/api/catalogos/edades`)
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


}
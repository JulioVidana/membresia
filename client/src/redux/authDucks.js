/* import Axios from 'axios'
import backendUrl from './backendUrl'
import { returnErrors } from './erroresDucks'
import { addNotificacion } from './notifyDucks'
 */
//  CONSTANTES
/* const dataInicial = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: null,
    usuario: null,
    loading: true
} */
const dataInicial = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: null,
    usuario: {
        _id: '602bf8c2e9176be5008ef2cc',
        nombre: 'Julio Cesar',
        email: 'julio.vidana@gmail.com',
        rol: 1
    },
    loading: true
}
//  TYPES
const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const AUTH_ERROR = "AUTH_ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";

//REDUCER
export default function authReducer(state = dataInicial, action) {
    switch (action.type) {
        case USER_LOADING:
            return { ...state, loading: false }
        case USER_LOADED:
            return { ...state, isAuthenticated: true, loading: false, usuario: action.payload }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            sessionStorage.setItem('token', action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true, loading: false }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return { ...state, token: null, usuario: null, isAuthenticated: false, loading: false }
        default:
            return state
    }
}
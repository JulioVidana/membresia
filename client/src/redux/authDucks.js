import Axios from 'axios'
import backendUrl from '../utils/backendUrl'
import { returnErrors, clearErrors } from './erroresDucks'
import { cargaIglesia } from './generalDucks'

//  CONSTANTES
//const token = localStorage.getItem('token')
const userInfo = localStorage.getItem('usuario')
const expiresAt = localStorage.getItem('expiresAt')

const isAuthenticated = () => {
    if (!expiresAt) {
        return false
    }
    return (
        new Date().getTime() / 1000 < expiresAt
    )
}

const dataInicial = {
    token: null,
    isAuthenticated: isAuthenticated(),
    usuario: userInfo ? JSON.parse(userInfo) : {},
    expiresAt: expiresAt,
    loading: false
}

//  TYPES
const LOADING = '@login/loading'
const LOADED = '@login/loaded'
const AUTH_ERROR = "@login/authError"
const LOGIN_SUCCESS = "@login/success"
const LOGIN_FAIL = "@login/loginFail"
const LOGOUT_SUCCESS = "@login/logoutSuccess"

//REDUCER
export default function authReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: false }
        case LOADED:
            return { ...state, isAuthenticated: true, loading: false, usuario: action.payload }
        case LOGIN_SUCCESS:
            localStorage.setItem('usuario', JSON.stringify(action.payload.userInfo))
            localStorage.setItem('expiresAt', action.payload.expiresAt)
            //localStorage.setItem('token', action.payload.token)
            localStorage.setItem('iglesia', JSON.stringify(action.payload.iglesia))
            return {
                ...state,
                token: action.payload.token,
                usuario: action.payload.userInfo,
                expiresAt: action.payload.expiresAt,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('usuario')
            localStorage.removeItem('expiresAt')
            //localStorage.removeItem('token')
            localStorage.removeItem('iglesia')
            return {
                ...state,
                token: null,
                usuario: null,
                isAuthenticated: false,
                expiresAt: null,
                loading: false
            }
        default:
            return state
    }
}


//ACCIONES
export const login = ({ email, password }) => async (dispatch) => {
    dispatch({ type: LOADING })
    const body = { email, password }

    Axios.post(`${backendUrl}/login`, body)
        .then(result => {

            dispatch(clearErrors())
            dispatch({ type: LOGIN_SUCCESS, payload: result.data })
            dispatch(cargaIglesia(result.data.iglesia))
            //dispatch(loadUsuer())
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({ type: LOGIN_FAIL })
        })

}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//check token y carga usuario
export const loadUsuer = () => async (dispatch, getState) => {

    dispatch({ type: LOADING })

    Axios.get(`${backendUrl}/login/profile`)
        .then(res => {
            dispatch({ type: LOADED, payload: res.data })
            dispatch(cargaIglesia(res.data.iglesia))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'));
            dispatch({
                type: AUTH_ERROR
            })
        })

}






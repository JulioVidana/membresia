import Axios from 'axios'
import backendUrl from './backendUrl'

const token = localStorage.getItem('token')

const authAxios = Axios.create({
    baseURL: backendUrl,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

/* authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  ) */

/* authAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const code =
      error && error.response ? error.response.status : 0;
    if (code === 401 || code === 403) {
      console.log('error code', code);
    }
    return Promise.reject(error);
  }
) */

/* const setToken = getState => {
    const token = getState().auth.token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return config
} */


export default authAxios
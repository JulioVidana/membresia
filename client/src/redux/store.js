//import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';


import generalReducer from './generalDucks';
import erroresReducer from './erroresDucks';
import personaDetReducer from './personaDetalleDucks'

const rootReducer = combineReducers({
    error: erroresReducer,
    general: generalReducer,
    personaDetalle: personaDetReducer

})

//extensión de google chrome para visualizar la tienda en navegador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    //const store = createStore(rootReducer, applyMiddleware(thunk))

    return store;
}
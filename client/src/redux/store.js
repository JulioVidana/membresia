import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';


import generalReducer from './generalDucks';
import erroresReducer from './erroresDucks';
import personaDetReducer from './personaDetalleDucks'
import iglesiasReducer from './iglesiasDucks';
import notifyReducer from './notifyDucks';
import usuariosReducer from './usuariosDucks';
import catalogosPersonas from './CatalogosPersonasDucks'
import personasReducer from './personasDucks'
import familiasReducer from './familiasDucks'
import notasReducer from './notasDucks'
import authReducer from './authDucks'
import dashBoardReducer from './dasboardDucks'
import catalogosCustomReducer from './catalogosCustomDucks'

const rootReducer = combineReducers({
    auth: authReducer,
    general: generalReducer,
    catalogos: catalogosPersonas,
    personaDetalle: personaDetReducer,
    personas: personasReducer,
    notas: notasReducer,
    familias: familiasReducer,
    iglesias: iglesiasReducer,
    usuarios: usuariosReducer,
    notificacion: notifyReducer,
    error: erroresReducer,
    dashboard: dashBoardReducer,
    catalogosCustom: catalogosCustomReducer

})

//extensión de google chrome para visualizar la tienda en navegador
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    //COMENTAR esta linea al subir al servidor
    //const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    //DEScomentar esta linea al subir al servidor
    const store = createStore(rootReducer, applyMiddleware(thunk))

    return store;
}
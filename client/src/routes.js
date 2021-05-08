import React from 'react'
import { Navigate } from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'
import MainLayout from 'src/layouts/MainLayout'
import AccountView from 'src/views/account/AccountView'
import DashboardView from 'src/views/dashboard'
import InicioView from 'src/views/inicio'
import LoginView from 'src/views/auth/LoginView'
import NotFoundView from 'src/views/errors/NotFoundView'
import UsuariosView from './views/usuarios/UsuariosView'
import IglesiasView from './views/iglesias/IglesiasView'
import AgregarIglesia from './views/iglesias/IglesiasView/NuevaIglesias'
import PersonasView from './views/personas/PersonasView'
import AgregarPersona from './views/personas/PersonasView/NuevaPersona'
import PersonaDetalle from './views/personaDetalle'
import NotasGlobal from './views/notasGlobal'
import PersonasView2 from './views/personas/PersonasView/Index2'
import PersonasLaunch from './views/personas/PersonasView/Launch'
import CatalogosLaunch from './views/catalogos/Launch'
import CatalogosCustom from './views/catalogos/'
import CatalogosEdicion from './views/catalogos/edicion'

//Object-based Routes de la Versión 6 en lugar de usar la etiqueta  <Route path="/" element={<UsersIndex />} />

const routes = (auth) => [
  {
    path: 'app',
    element: !auth.isAuthenticated && !auth.loading ? <Navigate to="/login" /> : <DashboardLayout />,
    children: [
      { path: 'home', element: <InicioView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'usuarios', element: auth.usuario?.rol === 'superadmin' ? <UsuariosView /> : <InicioView /> },
      { path: 'iglesias', element: auth.usuario?.rol === 'superadmin' ? <IglesiasView /> : <InicioView /> },
      { path: 'addiglesia', element: <AgregarIglesia /> },
      {
        path: 'personas',
        element: <PersonasLaunch />,
        children: [
          { path: '/', element: <PersonasView /> },
          { path: ':idpersona', element: <PersonaDetalle /> },
        ]
      },
      { path: 'addpersona', element: <AgregarPersona /> },
      { path: 'notasglobal', element: <NotasGlobal /> },
      {
        path: 'catalogos',
        element: <CatalogosLaunch />,
        children: [
          { path: '/', element: <CatalogosCustom /> },
          { path: ':idcatalogo', element: <CatalogosEdicion /> },
        ]
      },
      { path: 'personas2', element: <PersonasView2 /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  }
]

export default routes

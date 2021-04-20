import 'react-perfect-scrollbar/dist/css/styles.css'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from 'src/components/GlobalStyles'
import 'src/mixins/chartjs'
import theme from 'src/theme'
import routes from 'src/routes'
import Notif from './components/Notif'
import { useSelector } from 'react-redux'


const App = () => {
  const auth = useSelector(store => store.auth)
  const routing = useRoutes(routes(auth))


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Notif />
      {routing}
    </ThemeProvider>
  )
}

export default App

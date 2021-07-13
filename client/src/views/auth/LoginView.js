import React from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import Page from 'src/components/Page'
import { login } from 'src/redux/authDucks'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}))

const initialFValues = {
  email: '',
  password: '',
  msg: null
}

const LoginView = (props) => {
  const { isAuthenticated, loading } = props
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <>
      {isAuthenticated && <Navigate to="/app/home" />}
      <Page
        className={classes.root}
        title="Login"
      >

        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={initialFValues}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Correo electrónico es requerido'),
                password: Yup.string().max(255).required('Contraseña es requerida')
              })}
              onSubmit={values =>
                dispatch(login(values))
              }
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>

                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Iniciar Sesión
                    </Typography>
                  </Box>

                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Escribe tu usuario y contraseña para acceder al sistema
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Correo Electrónico"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Contraseña"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
        <Backdrop className={classes.backdrop} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Page>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})
export default connect(mapStateToProps, { login })(LoginView);

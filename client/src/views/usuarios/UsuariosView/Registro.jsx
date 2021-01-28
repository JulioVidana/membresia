import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
//import { agregaUsuarioAccion, actualizaUsuarioAccion } from 'src/redux/usuariosDucks';
import { clearErrors } from 'src/redux/erroresDucks';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const roles = [
    {
        value: 1,
        label: 'Administrador'
    },
    {
        value: 2,
        label: 'Agente'
    },
    {
        value: 3,
        label: 'Editor'
    }
];

const initialFValues = {
    _id: 0,
    email: '',
    nombre: '',
    password: '',
    activo: true,
    msg: null,
    rol: 2
}

const RegistroView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [values, setValues] = useState(initialFValues);
    const [editar, setEditar] = useState(false)
    //const [msg, setMsg] = useState(null);
    const { setOpenPopup, setNotify, recordForEdit, error, usuarios } = props;

    //console.log('popupConsole', recordForEdit)

    useEffect(() => {
        // Check for register error
        /*  if (usuarios.regis) {
             console.log('puedes registrar e ignora el error', usuarios.regis)
         } else { console.log('hubo un error no se cierra modal', usuarios.regis) } */
        if (error.id === 'REGISTRO_ERROR') {

            //setNotify({ isOpen: true, message: error.msg.msg, type: 'error' })
            console.log(error.msg.msg)
        } else {
            //console.log('pruebilla')
        }

        if (recordForEdit != null)
            setEditar(true);
        setValues({
            ...recordForEdit
        })
    }, [error, recordForEdit, usuarios])

    return (
        <Page
            className={classes.root}
            title="Register"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        enableReinitialize={editar}
                        initialValues={values}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Dirección de correo invalido').max(255).required('Falta Email'),
                                nombre: Yup.string().max(255).min(6, 'Mínimo 6 caracteres').required('Falta Nombre'),
                                password: Yup.string().min(6, 'Mínimo 6 caracteres').max(255).required('Falta password ')
                            })
                        }
                        onSubmit={(values) => {
                            //values.preventDefault();
                            //editar ? dispatch(actualizaUsuarioAccion(values)) : dispatch(agregaUsuarioAccion(values))
                            setOpenPopup(false);
                            setNotify({ isOpen: true, message: 'Se agregó usuario', type: 'success' })
                            //dispatch(obtenerUsuariosAccion())
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <TextField
                                    error={Boolean(touched.nombre && errors.nombre)}
                                    fullWidth
                                    helperText={touched.nombre && errors.nombre}
                                    label="Nombre"
                                    margin="normal"
                                    name="nombre"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.nombre}
                                    variant="outlined"
                                />
                                <TextField
                                    disabled={editar}
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email"
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
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />

                                <TextField
                                    fullWidth
                                    label="Roles"
                                    margin="normal"
                                    name="rol"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.rol}
                                    variant="outlined"
                                >
                                    {roles.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <Box
                                    alignItems="center"
                                    display="flex"
                                    ml={-1}
                                >
                                    <Checkbox
                                        checked={values.activo}
                                        name="activo"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body1">
                                        Activo
                                        </Typography>
                                </Box>
                                {Boolean(touched.activo && errors.activo) && (
                                    <FormHelperText error>
                                        {errors.activo}
                                    </FormHelperText>
                                )}
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        {editar ? "Actualizar" : "Registrar"}
                                    </Button>
                                </Box>

                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Page>
    );
};

const mapStateToProps = state => ({
    error: state.error,
    usuarios: state.usuarios
})

export default connect(mapStateToProps, { clearErrors })(RegistroView);

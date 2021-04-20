import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addNotificacion } from 'src/redux/notifyDucks'
import { obtenerIglesias } from 'src/redux/iglesiasDucks';
import { agregaUsuario, actualizaUsuario } from 'src/redux/usuariosDucks'
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
    makeStyles,
    Switch
} from '@material-ui/core';
import Page from 'src/components/Page';
//import { agregaUsuarioAccion, actualizaUsuarioAccion } from 'src/redux/usuariosDucks';
import { roles } from './data';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));



const initialFValues = {
    _id: 0,
    email: '',
    nombre: '',
    password: '',
    activo: true,
    msg: null,
    rol: 'admin'
}



const RegistroView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [values, setValues] = useState(initialFValues);
    const [editar, setEditar] = useState(false)
    const iglesias = useSelector(store => store.iglesias.datos);
    const { setOpenPopup, recordForEdit } = props;
    const [passSwitch, setPassSwitch] = useState(false);

    //console.log('popupConsole', recordForEdit)


    useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerIglesias())
        }
        fetchData()

        if (recordForEdit != null) {
            setEditar(true);
            setValues({
                ...recordForEdit, password: ''
            })
        } else {
            setPassSwitch(true)
        }


    }, [recordForEdit, dispatch])

    const switchChange = (event) => {
        //console.log('evento', event)
        setPassSwitch(event.target.checked);
    };
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
                                password: !editar ? Yup.string().min(6, 'Mínimo 6 caracteres').max(255).required('Falta password ') : ''
                            })
                        }
                        onSubmit={(values) => {
                            editar
                                ?
                                dispatch(actualizaUsuario(values))
                                    .then(() => {
                                        dispatch(addNotificacion('Se actualizó correctamente', true, 'success'))
                                        setOpenPopup(false);
                                    })
                                : dispatch(agregaUsuario(values))
                                    .then(result => {
                                        console.log(result)
                                        dispatch(addNotificacion('Se agregó correctamente', true, 'success'))
                                        setOpenPopup(false);
                                    })
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
                                {
                                    editar &&
                                    <Switch
                                        checked={passSwitch}
                                        onChange={switchChange}
                                        color='primary'
                                        name="checkedA"
                                        label='contraseña'
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }

                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    disabled={!passSwitch}
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
                                            key={option._id}
                                            value={option._id}
                                        >
                                            {option.rol}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    label="Iglesia"
                                    margin="normal"
                                    name="iglesia"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.iglesia}
                                    variant="outlined"
                                >
                                    <option aria-label="None" value="" />
                                    {iglesias.map((option) => (
                                        <option
                                            key={option._id}
                                            value={option._id}
                                        >
                                            {option.nombre}
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
        </Page >
    );
};


export default RegistroView;

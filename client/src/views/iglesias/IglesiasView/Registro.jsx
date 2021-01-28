import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import {
    Box,
    Button,
    TextField,
    makeStyles,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid
} from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';
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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format="+1 (###) ###-####"
            allowEmptyFormatting
            mask="_"
        />
    );
}
NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const initialFValues = {
    _id: 0,
    pastor: '',
    nombre: '',
    cobertura: '',
    ciudad: '',
    pais: '',
    telefono: '',
    msg: null
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

        <Formik
            enableReinitialize={editar}
            initialValues={values}
            validationSchema={
                Yup.object().shape({
                    nombre: Yup.string().max(255).min(6, 'Mínimo 3 caracteres').required('Falta Nombre de Iglesia'),
                    pastor: Yup.string().max(255).min(6, 'Mínimo 6 caracteres').required('Falta Pastor'),
                    ciudad: Yup.string().max(255).min(6, 'Mínimo 6 caracteres').required('Falta Ciudad'),
                    cobertura: Yup.string().max(255).min(3, 'Mínimo 3 caracteres'),
                    telefono: Yup.string().max(255).min(10, 'Mínimo 10 caracteres')
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
                    <Card>
                        <CardHeader
                            subheader="Datos Iglesia"
                            title="Iglesia"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={1}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.nombre && errors.nombre)}
                                        fullWidth
                                        helperText={touched.nombre && errors.nombre}
                                        label="Nombre Iglesia"
                                        margin="normal"
                                        name="nombre"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nombre}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.cobertura && errors.cobertura)}
                                        fullWidth
                                        helperText={touched.cobertura && errors.cobertura}
                                        label="Cobertura"
                                        margin="normal"
                                        name="cobertura"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.cobertura}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.pastor && errors.pastor)}
                                        fullWidth
                                        helperText={touched.pastor && errors.pastor}
                                        label="Pastor"
                                        margin="normal"
                                        name="pastor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.pastor}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.telefono && errors.telefono)}
                                        fullWidth
                                        helperText={touched.telefono && errors.telefono}
                                        label="Teléfono"
                                        margin="normal"
                                        name="telefono"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.telefono}
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.ciudad && errors.ciudad)}
                                        fullWidth
                                        helperText={touched.ciudad && errors.ciudad}
                                        label="Ciudad"
                                        margin="normal"
                                        name="ciudad"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ciudad}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.pais && errors.pais)}
                                        fullWidth
                                        helperText={touched.pais && errors.pais}
                                        label="Pais"
                                        margin="normal"
                                        name="pais"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.pais}
                                        variant="outlined"
                                    />
                                </Grid>


                            </Grid>
                        </CardContent>
                        <Divider />
                        <Grid
                            container
                            spacing={0}
                            justify="flex-end"
                        >
                            <Grid
                                item
                                md={3}
                                xs={12}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    p={1}
                                >
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
                            </Grid>
                            <Grid
                                item
                                md={1}
                                xs={12}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    p={1}
                                >
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        component={NavLink}
                                        to='/app/iglesias'
                                    >
                                        {<BackspaceIcon />}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </form>
            )}
        </Formik>

    );
};

const mapStateToProps = state => ({
    error: state.error,
    usuarios: state.usuarios
})

export default connect(mapStateToProps, { clearErrors })(RegistroView);

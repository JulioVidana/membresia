import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import {
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import BackspaceIcon from '@material-ui/icons/Backspace';
//import { agregaUsuarioAccion, actualizaUsuarioAccion } from 'src/redux/usuariosDucks';
import { clearErrors } from 'src/redux/erroresDucks';


/* const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
})); */

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
    nombre: '',
    aPaterno: '',
    aMaterno: '',
    email: '',
    phone: '',
    calle: '',
    colonia: '',
    ciudad: '',
    zip: '',
    msg: null
}

const generos = [
    {
        value: 1,
        label: 'Feminino'
    },
    {
        value: 2,
        label: 'Masculino'
    }
];

const civil = [
    {
        value: 1,
        label: 'Soltero'
    },
    {
        value: 2,
        label: 'Casado'
    },
    {
        value: 3,
        label: 'Viudo'
    },
    {
        value: 4,
        label: 'Unión Libre'
    },
    {
        value: 5,
        label: 'Divorciado'
    },
]

const RegistroView = (props) => {
    //const classes = useStyles();
    //const dispatch = useDispatch()
    const [values, setValues] = useState(initialFValues);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [editar, setEditar] = useState(false)
    //const [msg, setMsg] = useState(null);
    const { setOpenPopup, setNotify, recordForEdit, error, usuarios } = props;

    //console.log('popupConsole', recordForEdit)
    //console.log('Fecha', Date())
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
                            title="Agregar Persona"
                            subheader="Datos Básicos"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={1}
                            >
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
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
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.aPaterno && errors.aPaterno)}
                                        fullWidth
                                        helperText={touched.aPaterno && errors.aPaterno}
                                        label="Apellido Paterno"
                                        margin="normal"
                                        name="aPaterno"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aPaterno}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.aMaterno && errors.aMaterno)}
                                        fullWidth
                                        helperText={touched.aMaterno && errors.aMaterno}
                                        label="Apellido Materno"
                                        margin="normal"
                                        name="aMaterno"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aMaterno}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Correo Electónico"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.phone && errors.phone)}
                                        fullWidth
                                        helperText={touched.phone && errors.phone}
                                        label="Teléfono"
                                        margin="normal"
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.calle && errors.calle)}
                                        fullWidth
                                        helperText={touched.calle && errors.calle}
                                        label="Calle"
                                        margin="normal"
                                        name="calle"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.calle}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={3}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.colonia && errors.colonia)}
                                        fullWidth
                                        helperText={touched.colonia && errors.colonia}
                                        label="Colonia"
                                        margin="normal"
                                        name="colonia"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.colonia}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={3}
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
                                    md={2}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.zip && errors.zip)}
                                        fullWidth
                                        helperText={touched.zip && errors.zip}
                                        label="CP"
                                        margin="normal"
                                        name="zip"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.zip}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Género"
                                        margin="normal"
                                        name="genero"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.genero}
                                        variant="outlined"
                                    >
                                        {generos.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            margin="normal"
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Fecha de Nacimiento"
                                            format="MM/DD/YYYY"
                                            value={selectedDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handleDateChange(date)}
                                        />
                                    </MuiPickersUtilsProvider>


                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Estado civil"
                                        margin="normal"
                                        name="civil"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.civil}
                                        variant="outlined"
                                    >
                                        {civil.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
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
                                        to='/app/personas'
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

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { agregaPersona, actualizaPersona } from 'src/redux/personasDucks'
import { traePersona } from 'src/redux/personaDetalleDucks'
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    TextField,
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles((theme) => ({
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    }
}))
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


const RegistroView = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { values, editar, generos, civil, escolaridad, notif, edades, setOpenPopup } = props;

    const initialFValues = {
        _id: values._id,
        nombre: values.nombre,
        aPaterno: values.aPaterno,
        aMaterno: values.aMaterno,
        grupoEdad: values.grupoEdad,
        email: values.email,
        telefono: values.telefono,
        ciudad: values.ciudad,
        calle: values.calle,
        colonia: values.colonia,
        cp: values.cp,
        sexo: values.sexo,
        iglesia: values.iglesia,
        oficio: values.oficio,
        civil: values.civil._id,
        escolaridad: values.escolaridad._id
    }
    //console.log({ initialFValues })



    return (

        <Formik
            enableReinitialize={true}
            initialValues={initialFValues}
            validationSchema={
                Yup.object().shape({
                    nombre: Yup.string().max(255).min(3, 'Mínimo 3 caracteres').required('Falta Nombre'),
                    aPaterno: Yup.string().max(255).min(3, 'Mínimo 3 caracteres').required('Falta Apellido Paterno'),
                    sexo: Yup.string().required('Falta Genero'),
                    grupoEdad: Yup.string().required('Falta Grupo Edad'),
                    telefono: Yup.string().max(11).min(10, 'al menos 10')
                })
            }
            onSubmit={(values) => {
                editar
                    ?
                    dispatch(actualizaPersona(values))
                        .then(() => {
                            dispatch(notif('Se actualizó correctamente', true, 'success'))
                            dispatch(traePersona(values))
                            setOpenPopup(false)
                        })
                    :
                    dispatch(agregaPersona(values))
                        .then(() => {
                            dispatch(notif('Se agregó correctamente', true, 'success'))
                            navigate('/app/personas')
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
                values,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
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
                                fullWidth
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
                                fullWidth
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
                            md={2}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(touched.cp && errors.cp)}
                                fullWidth
                                helperText={touched.cp && errors.cp}
                                label="CP"
                                margin="normal"
                                name="cp"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cp}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={3}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(touched.sexo && errors.sexo)}
                                fullWidth
                                helperText={touched.sexo && errors.sexo}
                                label="Género"
                                margin="normal"
                                name="sexo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                select
                                SelectProps={{ native: true }}
                                value={values.sexo}
                                variant="outlined"
                            >
                                <option aria-label="None" value="" />
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
                            md={3}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(touched.grupoEdad && errors.grupoEdad)}
                                fullWidth
                                helperText={touched.grupoEdad && errors.grupoEdad}
                                label="Grupo Edad"
                                margin="normal"
                                name="grupoEdad"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                select
                                SelectProps={{ native: true }}
                                value={values.grupoEdad}
                                variant="outlined"
                            >
                                <option aria-label="None" value="" />
                                {edades.map((option) => (
                                    <option
                                        key={option._id}
                                        value={option.grupo}
                                    >
                                        {option.grupo}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={3}
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
                                    name="nacimiento"
                                    value={values.nacimiento}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={value => setFieldValue("nacimiento", value)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid
                            item
                            md={3}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(touched.civil && errors.civil)}
                                fullWidth
                                helperText={touched.civil && errors.civil}
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
                                        key={option._id}
                                        value={option._id}
                                    >
                                        {option.estado}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(touched.oficio && errors.oficio)}
                                fullWidth
                                helperText={touched.oficio && errors.oficio}
                                label="Oficio"
                                margin="normal"
                                name="oficio"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.oficio}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Escolaridad"
                                margin="normal"
                                name="escolaridad"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                select
                                SelectProps={{ native: true }}
                                value={values.escolaridad}
                                variant="outlined"
                            >

                                {escolaridad.map((option) => (
                                    <option
                                        key={option._id}
                                        value={option._id}
                                    >
                                        {option.escolaridad}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>

                    <Divider className={classes.espacio} />

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
                        {
                            !editar &&
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
                        }
                    </Grid>
                </form>
            )}
        </Formik>

    );
};



export default RegistroView;

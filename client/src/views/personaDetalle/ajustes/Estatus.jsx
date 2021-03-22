import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addInactivo } from 'src/redux/personaDetalleDucks'
import {
    Box,
    makeStyles,
    Grid,
    TextField,
    Divider,
    Paper,
    Typography,
    colors,
    Button
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        maxWidth: 500,
        //paddingBottom: theme.spacing(3),
        //paddingTop: theme.spacing(3)
    },
    aviso: {
        padding: theme.spacing(2),
        background: colors.grey[300]
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
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



const Estatus = ({ motivoBaja, setOpenPopup, notif }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [inactivo, setInactivo] = useState({
        motivo: 'Sin motivo',
        fecha: new Date(),
        activo: false,

    })
    const { motivo, fecha } = inactivo
    const onChange = (nombre, valor) => {
        setInactivo({
            ...inactivo,
            [nombre]: valor
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addInactivo(inactivo))
            .then(() => {
                dispatch(notif('Se actualizó correctamente', true, 'success'))
                setOpenPopup(false)
            })
    }
    return (
        <form onSubmit={onSubmit} >
            <Box
                className={classes.root}
            >
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Paper className={classes.aviso}>
                            <Typography
                                gutterBottom
                                variant="h5">
                                Los miembros inactivos son usuarios que ya no asisten a su iglesia.
                                Una vez marcados como inactivos, ya no aparecerán en su lista de personas,
                                listas personalizadas ni en las estadísticas del tablero, pero su historial
                                permanecera intacto.
                        </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            fullWidth
                            label="Motivo"
                            margin="normal"
                            name="motivo"
                            select
                            SelectProps={{ native: true }}
                            variant="outlined"
                            onChange={e => onChange(e.target.name, e.target.value)}
                            value={motivo}
                        >
                            {motivoBaja.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.motivo}
                                >
                                    {option.motivo}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                fullWidth
                                margin="normal"
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="Fecha"
                                name='fecha'
                                format="MM/DD/YYYY"
                                value={fecha}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => onChange('fecha', date)}
                            />
                        </MuiPickersUtilsProvider>
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
                                Guardar
                                </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </form>
    )
}

export default Estatus

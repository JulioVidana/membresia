import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBautismo } from 'src/redux/personaDetalleDucks'

import {
    Box,
    makeStyles,
    Grid,
    Switch,
    Divider,
    FormControlLabel,
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
        width: '100%',
        flexGrow: 1
    },
    aviso: {
        padding: theme.spacing(2),
        background: colors.grey[300]
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    switch: {
        display: 'flex'
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

const Bautismo = ({ bautismoEstatus, setOpenPopup, notif }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [bautizo, setBautizo] = useState({
        activo: bautismoEstatus,
        fecha: new Date()

    })

    const { activo, fecha } = bautizo

    const onChange = (nombre, valor) => {
        setBautizo({
            ...bautizo,
            [nombre]: valor
        })
    }


    const onSubmit = e => {
        e.preventDefault()
        dispatch(addBautismo(bautizo))
            .then(() => {
                dispatch(notif('Se actualizó Bautismo', true, 'success'))
                setOpenPopup(false)
            })


    }

    const cancelar = () => {
        setOpenPopup(false)
        //setFiles([])
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
                        xs={6}
                        justify="center"
                        alignItems="center"

                        className={classes.switch}
                    >
                        <FormControlLabel
                            control={
                                <Switch

                                    checked={activo}
                                    onChange={e => onChange('activo', e.target.checked)}
                                    color='primary'
                                    name="Bautizado"
                                    label='Bautizado'
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label="Bautizado"
                        />

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
                        xs={6}
                    >
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={1}
                        >

                            <Button
                                color="secondary"
                                size="large"
                                onClick={() => cancelar()}
                            >
                                cancelar
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
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

export default Bautismo

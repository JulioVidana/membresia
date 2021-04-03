import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nuevaNota } from 'src/redux/notasDucks'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {
    Button,
    Divider,
    Typography,
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import * as Yup from 'yup'

const validSchema = Yup.object().shape({
    nota: Yup.string().max(255).required('Falta Texto de Nota')
})
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

const categoria = [
    {
        value: 'General',
        label: 'General'
    },
    {
        value: 'Oracion',
        label: 'Petición de Oración'
    }
];

const NuevaNota = ({ datosPersona, usuario, notif }) => {
    const dispatch = useDispatch()
    const dataInicial = {
        nota: '',
        categoria: 'General',
        persona: datosPersona._id,
        usuario: usuario._id,
        fecha: new Date()
    }
    const errorInicial = { error: false, msj: '' }
    const [expanded, setExpanded] = useState(false)
    const [nota, setNota] = useState(dataInicial)
    const [error, setError] = useState(errorInicial)

    const handleChange = (panel) => (event, isExpanded) => {
        setNota(dataInicial)
        setExpanded(isExpanded ? panel : false)
    }

    const onChange = async (nombre, valor) => {
        setNota({
            ...nota,
            [nombre]: valor
        })

        const isValid = await validSchema.isValid(nota)
        isValid && setError(errorInicial)

    }

    const guardarNota = async (e) => {
        e.preventDefault()

        await validSchema.validate(nota)
            .then(datos => {
                dispatch(nuevaNota(datos))
                    .then(() => {
                        dispatch(notif('Se guardó Nota correctamente', true, 'success'))
                        setExpanded(false)
                        setNota(dataInicial)
                    })
            })
            .catch(err => {
                setError({ error: true, msj: err.errors[0] })
            })


    }

    const cancelar = () => {
        setExpanded(false)
        setNota(dataInicial)
        setError(errorInicial)
    }

    return (
        <form onSubmit={guardarNota}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>NUEVA NOTA &nbsp;</Typography>
                    <AddIcon color='primary' />
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid
                            item
                            md={2}
                            xs={6}
                        >
                            <TextField
                                fullWidth
                                label="Categoría"
                                margin="normal"
                                name="categoria"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                                value={nota.categoria}
                                onChange={e => onChange(e.target.name, e.target.value)}
                            >
                                {categoria.map((option) => (
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
                            md={2}
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
                                    format="MM/DD/YYYY"
                                    name="fecha"
                                    value={nota.fecha}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={date => onChange('fecha', date)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Nota"
                                margin="normal"
                                name="nota"
                                variant="outlined"
                                value={nota.nota}
                                onChange={e => onChange('nota', e.target.value)}
                                error={error.error}
                                helperText={error.msj}
                            />
                        </Grid>
                    </Grid>

                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small"
                        onClick={cancelar}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        type="submit"
                    >
                        GUARDAR
                    </Button>
                </AccordionActions>
            </Accordion>
        </form>
    )
}

export default NuevaNota

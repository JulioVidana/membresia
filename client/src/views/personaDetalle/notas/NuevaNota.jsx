import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
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
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/AddCircleOutline';


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
        value: 1,
        label: 'General'
    },
    {
        value: 2,
        label: 'Petición Oración'
    }
];

const NuevaNota = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        //console.log(expanded)
        setExpanded(isExpanded ? panel : false);
    };

    return (
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
                        />
                    </Grid>
                </Grid>

            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Button size="small">Cancelar</Button>
                <Button size="small" color="primary">
                    GUARDAR
          </Button>
            </AccordionActions>
        </Accordion>
    )
}

export default NuevaNota

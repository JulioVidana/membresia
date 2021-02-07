import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Grid,
    TextField,
    Paper,
    Chip,
    IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    root: {},
    form: {
        paddingTop: theme.spacing(2),
    },
    pageContent: {
        padding: theme.spacing(2),
        background: '#F2F2F5'
    },
    margin: {
        margin: theme.spacing(0),
        color: '#f44336'
    },
}));

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

const NotasTotal = () => {
    const classes = useStyles();

    return (

        <Card >
            <CardContent>
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
                            label="Filtrar por Categoría"
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

                </Grid>
                <Divider />
                <Box className={classes.form}>
                    <Paper className={classes.pageContent}>
                        <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid
                                item
                            >
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="subtitle1">
                                    Esta pidiendo que lo ayuden con oración
                            </Typography>
                            </Grid>
                            <Grid
                                item
                            >
                                <Chip color="secondary" size="small" label='Petición Oración' />
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid
                                item
                            >
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="caption">
                                    Feb 10, 2021 por Julio V
                            </Typography>
                            </Grid>
                            <Grid
                                item
                            >
                                <IconButton aria-label="delete" className={classes.margin}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Grid>

                        </Grid>

                    </Paper>
                </Box>
            </CardContent>
        </Card>
    )
}

export default NotasTotal

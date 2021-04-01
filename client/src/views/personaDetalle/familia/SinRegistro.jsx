import React from 'react'
import {
    Typography,
    Button,
    Box,
    Divider,
    Grid
} from '@material-ui/core'
import HouseIcon from '@material-ui/icons/House';

const SinRegistro = ({ personaData, setForm, cancelar, classes }) => {
    //console.log(datos)
    const agregar = () => {
        setForm(true)
    }
    return (
        <Box >
            <HouseIcon style={{ fontSize: 60 }} color='secondary' />
            <Typography variant='h4'>
                Sin Familia
            </Typography>
            <Box m={2}>
                <Typography variant='h6'>
                    {`${personaData?.completo} no pertenece a ninguna familia`}
                </Typography>

            </Box>
            <Button
                variant="contained"
                color="primary"
                size='large'
                onClick={agregar}
            >
                Agregar Familia
            </Button>
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
                    >

                        <Button
                            color="secondary"
                            onClick={cancelar}
                        >
                            Cancelar
                            </Button>
                    </Box>

                </Grid>

            </Grid>
        </Box>
    )
}

export default SinRegistro

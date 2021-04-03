import React from 'react';
import { Box } from '@material-ui/core';
import NuevaNota from './NuevaNota'
import NotasTotal from './NotasTotal'


const Notas = ({ datos, notas, usuario, notif }) => {

    return (
        <Box>
            <NuevaNota
                datosPersona={datos}
                usuario={usuario}
                notif={notif}
            />
            <Box mt={2}>
                <NotasTotal
                    notas={notas}
                    notif={notif}
                />
            </Box>
        </Box>
    )
}

export default Notas

import React from 'react';
import { Box } from '@material-ui/core';
import NuevaNota from './NuevaNota'
import NotasTotal from './NotasTotal'


const Notas = (datos, ...rest) => {

    return (
        <Box>
            <NuevaNota />
            <Box mt={2}>
                <NotasTotal />
            </Box>
        </Box>
    )
}

export default Notas

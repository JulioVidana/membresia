import React from 'react'
import { useDispatch } from 'react-redux'
import { cambiaEstatus } from 'src/redux/personaDetalleDucks'
import { addNotificacion } from 'src/redux/notifyDucks'
import moment from 'moment';
import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab/';

const Inactivo = ({ estatus, setConfirmDialog, confirmDialog }) => {
    const dispatch = useDispatch()
    const inactivo = {
        motivo: 'Reactivo',
        fecha: new Date(),
        activo: true,
    }
    const activar = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        dispatch(cambiaEstatus(inactivo))
            .then(() => {
                dispatch(addNotificacion('Se rectivó persona', true, 'success'))
            })
    }

    return (
        <div>
            <Alert
                variant="filled"
                severity="warning"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: '¿Quieres reactivar a persona?',
                                subTitle: "La reactivación de este perfil restaurará toda la información del perfil anterior.",
                                type: "otro",
                                onConfirm: () => { activar() }
                            })
                        }}
                    >
                        ACTIVAR
                    </Button>
                }
            >
                {`¡Persona INACTIVA! - Desde: ${moment(estatus.fecha).format('LL')}`}
            </Alert>
        </div>
    )
}

export default Inactivo

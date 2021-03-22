import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { EliminarImagen } from 'src/redux/personaDetalleDucks'
import {
    Box,
    Grid,
    Button,
    Divider,
    makeStyles
} from '@material-ui/core'
import ConfirmDialog from 'src/components/ConfirmDialog'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    btnAlerta: {
        color: theme.palette.error.main,
    },
}));
const Preview = ({ imagenDB, setOpenPopup, notif, setImagenDB }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })

    const onDelete = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(EliminarImagen(imagenDB))
            .then(() => {
                dispatch(notif('Se borró imagen', true, 'success'))
                setOpenPopup(false)
            })
    }

    const cambiarImagen = () => {
        setImagenDB(undefined)
    }

    return (
        <Box >
            <img src={imagenDB.url} alt='' className={classes.root} />
            <Divider className={classes.espacio} />
            <Grid
                container
                justify="space-between"
                alignItems="flex-end"
            >
                <Button
                    className={classes.btnAlerta}
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: '¿Estas seguro de eliminar Imagen?',
                            subTitle: 'Una vez que se elimina la imagen, la única forma de recuperarla es volver a cargarla.',
                            type: 'alerta',
                            onConfirm: () => { onDelete() }
                        })
                    }}
                >Eliminar Imagen</Button>
                <Button
                    color='primary'
                    onClick={() => cambiarImagen()}
                >Cambiar Imagen</Button>


            </Grid>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </Box>
    )
}

export default Preview

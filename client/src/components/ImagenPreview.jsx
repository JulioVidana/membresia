import {
    Box,
    Grid,
    Button,
    Divider,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    btnAlerta: {
        color: theme.palette.error.main,
    },
}))

const ImagenPreview = ({
    imagenDB,
    setOpenPopup,
    notif,
    setImagenDB,
    onDelete,
    setConfirmDialog
}) => {
    const classes = useStyles()

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
                >
                    Cambiar Imagen
                </Button>


            </Grid>

        </Box>
    )
}

export default ImagenPreview

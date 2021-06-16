import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { subirImagen, cambiarImagen, EliminarImagen } from 'src/redux/usuariosDucks'
import {
    Box,
    makeStyles,
    Grid,
    Divider,
    colors,
    Button,
} from '@material-ui/core'
import StyledDropzone from 'src/components/DropZone'
import Preview from 'src/components/ImagenPreview'
import ImagenEditor from 'src/components/ImagenEditor'
import ConfirmDialog from 'src/components/ConfirmDialog'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%'
        //paddingBottom: theme.spacing(3),
        //paddingTop: theme.spacing(3)
    },
    aviso: {
        padding: theme.spacing(2),
        background: colors.grey[300]
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    }
}))

const Imagen = ({ setOpenPopup, imagen, notif, idUsuario }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [editor, setEditor] = useState(null)
    const [imagenDB, setImagenDB] = useState(imagen)
    const [files, setFiles] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })

    const cancelar = () => {
        setOpenPopup(false)
        //setFiles([])
    }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const subir = () => {
        //const url = editor.getImageScaledToCanvas().toDataURL()
        const canvas = editor.getImageScaledToCanvas()
        canvas.toBlob((blob) => {
            const data = new FormData()
            data.append("imagen", blob, "filename.jpg")
            if (imagen === undefined) {
                dispatch(subirImagen(data))
                    .then(() => {
                        cancelar()
                        dispatch(notif('Se agregó Imagen', true, 'success'))

                    })
            }
            else {
                dispatch(cambiarImagen(data))
                    .then(() => {
                        cancelar()
                        dispatch(notif('Se cambió Imagen', true, 'success'))

                    })
            }


        }, "image/jpeg", 0.80)

    }

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

    return (

        <Box
            className={classes.root}
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                >
                    {
                        imagenDB !== undefined ?
                            <Preview
                                imagenDB={imagenDB}
                                setOpenPopup={setOpenPopup}
                                notif={notif}
                                setImagenDB={setImagenDB}
                                onDelete={onDelete}
                                setConfirmDialog={setConfirmDialog}
                            />
                            :
                            files.length === 0 ?
                                <StyledDropzone setFiles={setFiles} />
                                :
                                <ImagenEditor
                                    files={files}
                                    setEditor={setEditor} />
                    }
                </Grid>

            </Grid>
            {
                imagenDB === undefined &&
                <div>
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
                                    onClick={() => cancelar()}
                                >
                                    cancelar
                                </Button>
                            </Box>
                        </Grid>
                        {
                            files.length !== 0 &&
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
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        onClick={() => subir()}
                                    >
                                        guardar
                                    </Button>

                                </Box>
                            </Grid>
                        }


                    </Grid>
                </div>
            }

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </Box>

    )
}

export default Imagen

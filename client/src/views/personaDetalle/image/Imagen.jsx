import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { subirImagen, cambiarImagen } from 'src/redux/personaDetalleDucks'
import {
    Box,
    makeStyles,
    Grid,
    Divider,
    colors,
    Button,
} from '@material-ui/core'
import StyledDropzone from './DropZone'
import Preview from './Preview'
import Edit from './Edit'


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

const Imagen = ({ setOpenPopup, imagen, notif }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [editor, setEditor] = useState(null)
    const [imagenDB, setImagenDB] = useState(imagen)
    const [files, setFiles] = useState([]);

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
                            />
                            :
                            files.length === 0 ?
                                <StyledDropzone
                                    setOpenPopup={setOpenPopup}
                                    setFiles={setFiles} />
                                :
                                <Edit
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

        </Box>

    )
}

export default Imagen

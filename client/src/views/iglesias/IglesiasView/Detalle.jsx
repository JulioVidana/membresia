import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Container,
    makeStyles,
    Grid
} from '@material-ui/core'
import Page from 'src/components/Page'
import DetalleImagen from 'src/components/DetalleImagen'
import Registro from './Registro'
import Imagen from './Imagen'
import Popup from 'src/components/Popup'
import { addNotificacion } from 'src/redux/notifyDucks'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const initialFValues = {
    _id: 0,
    pastor: '',
    nombre: '',
    cobertura: '',
    ciudad: '',
    pais: '',
    contacto: '',
    msg: null
}

const Detalle = () => {
    const classes = useStyles()
    const [values, setValues] = useState(initialFValues)
    const [editar, setEditar] = useState(false)
    const location = useLocation()
    const [openPopupImg, setOpenPopupImg] = useState(false)

    useEffect(() => {

        if (location.state != null) {
            if (location.state.recordForEdit != null)
                setEditar(true)
            setValues({
                ...location.state.recordForEdit
            })
        }

    }, [location.state])


    return (
        <Page
            className={classes.root}
            title="Agregar Iglesia"
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                >
                    {
                        editar &&
                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <DetalleImagen
                                title={values.nombre}
                                subTitle={values.ciudad}
                                setOpenPopup={setOpenPopupImg}
                                imagen={values.imagen?.url}
                            />
                        </Grid>
                    }
                    <Grid
                        item
                        lg={8}
                        md={8}
                        xs={12}
                    >
                        <Registro editar={editar} values={values} />
                    </Grid>
                </Grid>
            </Container>

            <Popup
                title='Editar Imagen'
                openPopup={openPopupImg}
                setOpenPopup={setOpenPopupImg}
            >
                <Imagen
                    imagen={values.imagen}
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopupImg}
                    idIglesia={values._id}
                />
            </Popup>
        </Page>
    )
}

export default Detalle

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import { addNotificacion } from 'src/redux/notifyDucks'
import {
    Container,
    Grid,
    makeStyles,
    Box,
    Tab,
    Tabs,
    Divider
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Page from 'src/components/Page'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import Famila from './familia/Familia'
import Notas from './notas/Notas'
import Actividad from './actividad/Actividad'
import Titulo from 'src/components/Toolbar'
import Popup from 'src/components/Popup'
import Registro from '../personas/PersonasView/Registro'
import Estatus from './ajustes/Estatus'
import Bautismo from './ajustes/Bautismo'
import Imagen from './image/Imagen'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box mt={2}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PersonaDetalle = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const catalogos = useSelector(store => store.catalogos)
    const personaData = useSelector(store => store.personaDetalle.persona)
    const { generos, edoCivil, grupoEdades, escolaridad, tipoMiembro } = catalogos
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupEs, setOpenPopupEs] = useState(false)
    const [openPopupBa, setOpenPopupBa] = useState(false)
    const [openPopupImg, setOpenPopupImg] = useState(false)





    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const openInPopup = () => {
        if (catalogos.edoCivil.length === 0) {
            dispatch(obtenerCatalogosPersonas())
        }
        setOpenPopup(true)
    }


    return (
        <Page
            className={classes.root}
            title="Account"
        >
            <Titulo
                title="Detalle Persona"
                btnType='edit'
                btnText="EDITAR"
                icono='edit'
                onClick={() => { openInPopup() }}
            />

            <Container maxWidth={false}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="GENERAL" {...a11yProps(0)} />
                    <Tab label="NOTAS" {...a11yProps(1)} />
                    <Tab label="ACTIVIDAD" {...a11yProps(2)} />
                </Tabs>
                <Divider />
                <TabPanel value={value} index={0}>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <Profile
                                datos={personaData}
                                setOpenPopup={setOpenPopupImg}
                            />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={8}
                            xs={12}
                        >

                            <ProfileDetails
                                datos={personaData}
                                tiposMiembro={tipoMiembro}
                                setOpenPopupBa={setOpenPopupBa}
                                setOpenPopupEs={setOpenPopupEs}
                            />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <Famila datos={personaData} />
                        </Grid>
                    </Grid>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Notas datos={personaData} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Actividad />
                </TabPanel>

            </Container>


            <Popup
                title="Datos Generales"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Registro
                    catalogos={catalogos}
                    values={personaData}
                    editar={true}
                    generos={generos}
                    civil={edoCivil}
                    edades={grupoEdades}
                    escolaridad={escolaridad}
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopup}
                />
            </Popup>

            <Popup
                title="Cambiar Estatus a Inactivo"
                openPopup={openPopupEs}
                setOpenPopup={setOpenPopupEs}
            >
                <Estatus
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopupEs}
                    motivoBaja={catalogos.motivoBaja}
                />
            </Popup>

            <Popup
                title="Bautismo"
                openPopup={openPopupBa}
                setOpenPopup={setOpenPopupBa}
            >
                <Bautismo
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopupBa}
                    bautismoEstatus={personaData.bautismo.activo}
                />
            </Popup>

            <Popup
                title='Editar Imagen'
                openPopup={openPopupImg}
                setOpenPopup={setOpenPopupImg}
            >
                <Imagen
                    imagen={personaData.imagen}
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopupImg}
                />
            </Popup>


        </Page>



    );
};

export default PersonaDetalle;

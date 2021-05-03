import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import { addNotificacion } from 'src/redux/notifyDucks'
import {
    Container,
    Grid,
    makeStyles,
    Box,
    Tab,
    Tabs,
    Divider,
    Slide
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Page from 'src/components/Page'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import Famila from './familia/FamiliaCard'
import Notas from './notas/Notas'
import Actividad from './actividad/Actividad'
import Titulo from 'src/components/Toolbar'
import Popup from 'src/components/Popup'
import Registro from '../personas/PersonasView/Registro'
import Estatus from './ajustes/Estatus'
import Bautismo from './ajustes/Bautismo'
import Imagen from './image/Imagen'
import RegistroFamilia from './familia/index'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

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
    const { idpersona } = useParams()
    const [value, setValue] = useState(0)
    const catalogos = useSelector(store => store.catalogos)
    const {
        generos,
        edoCivil,
        grupoEdades,
        escolaridad,
        tipoMiembro } = catalogos
    const personaData = useSelector(store => store.personaDetalle.persona)
    const personasList = useSelector(store => store.personas.personas)
    const familia = useSelector(store => store.familias.familia)
    const notas = useSelector(store => store.notas.notas)
    const usuario = useSelector(store => store.auth.usuario)
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupEs, setOpenPopupEs] = useState(false)
    const [openPopupBa, setOpenPopupBa] = useState(false)
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openFamilia, setOpenFamilia] = useState(false)



    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const openInPopup = () => {
        if (catalogos.edoCivil.length === 0) {
            dispatch(obtenerCatalogosPersonas())
        }
        setOpenPopup(true)
    }

    useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerCatalogosPersonas())
            dispatch(cargaPersona(idpersona))

        }
        fetchData()
    }, [dispatch, idpersona])


    return (
        <Page
            className={classes.root}
            title="Detalle Persona"
        >
            <Titulo
                title="Detalle Persona"
                btnType={usuario.rol === 'consulta' ? 'no' : 'edit'}
                btnText="EDITAR"
                icono='edit'
                onClick={() => { openInPopup() }}
            />
            {
                Object.keys(personaData).length !== 0 &&

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
                                    catalogoMiembros={tipoMiembro}
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
                                <Famila
                                    setOpenPopup={setOpenFamilia}
                                    familia={familia}
                                />
                            </Grid>
                        </Grid>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Notas
                            datos={personaData}
                            notas={notas}
                            usuario={usuario}
                            notif={addNotificacion}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Actividad />
                    </TabPanel>

                </Container>

            }
            <Popup
                title="Datos Generales"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                Transition={Transition}
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
                Transition={Transition}
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
                Transition={Transition}
            >
                <Bautismo
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopupBa}
                    bautismoEstatus={personaData.bautismo?.activo}
                    bautismoFecha={personaData.bautismo?.fecha}
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

            <Popup
                title='Editar Familia'
                openPopup={openFamilia}
                setOpenPopup={setOpenFamilia}
                fullWidth={true}
                maxWidth={'sm'}
                Transition={Transition}
            >
                <RegistroFamilia
                    personaData={personaData}
                    notif={addNotificacion}
                    setOpenPopup={setOpenFamilia}
                    personasList={personasList}
                    familia={familia}
                />
            </Popup>


        </Page>

    )
}

export default PersonaDetalle;

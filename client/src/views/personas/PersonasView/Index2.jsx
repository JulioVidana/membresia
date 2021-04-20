import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import { obtenerPersonas } from 'src/redux/personasDucks'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import {
    makeStyles,
    Box,
    Container,
    Card,
} from '@material-ui/core'

import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import esEs from './esEs'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '80%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))



const headCells = [
    { field: 'completo', headerName: 'Nombre', type: 'string', flex: 1 },
    { field: 'email', headerName: 'Correo Electrónico', type: 'string', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', type: 'number' },
    { field: 'createdAt', headerName: 'Fecha de Registro', type: 'dateTime', width: 150 },
    { field: 'oficio', headerName: 'Oficio', type: 'string', width: 150 },
    { field: 'sexo', headerName: 'Sexo', type: 'string', width: 150, hide: true },


]

const PeronasView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const iglesia = useSelector(store => store.general.iglesia)
    const personasList = useSelector(store => store.personas.personas)
    //const loading = useSelector(store => store.personas.loading)


    useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPersonas(iglesia))
            dispatch(obtenerCatalogosPersonas())
        }
        fetchData()
    }, [dispatch, iglesia])

    const abrirDetalle = item => {
        // console.log(item.row)
        dispatch(cargaPersona(item.row))
            .then(() => {
                navigate('/app/personadetalle');
            })
    }

    return (
        <Page
            className={classes.root}
            title="Lista de Personas 2"
        >
            <Titulo
                title="Lista de Persona"
                btnText="NUEVA PERSONA"
                icono='add'
                to='/app/addpersona'
            />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>

                        <Box >
                            <div style={{ height: 700, width: '100%' }}>
                                <DataGrid
                                    onRowClick={(e) => abrirDetalle(e)}
                                    localeText={esEs}
                                    columns={headCells}
                                    rows={personasList}
                                    components={{
                                        Toolbar: GridToolbar,
                                    }}
                                    pageSize={10}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    pagination
                                />
                            </div>



                        </Box>

                    </Card>
                </Box>
            </Container >
        </Page >
    )
}

export default PeronasView

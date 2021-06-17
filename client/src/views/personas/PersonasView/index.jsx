import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import { obtenerPersonas } from 'src/redux/personasDucks'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import moment from 'moment'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    Box,
    Container,
    Card,
    Avatar,
    Typography,
    Hidden
} from '@material-ui/core'

import PerfectScrollbar from 'react-perfect-scrollbar'
import getInitials from 'src/utils/getInitials'
import Tabla from 'src/components/Tabla'
import Toolbar from './Toolbar'
import ImportExport from './ImportExport'
//import data from './data';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    barExport: {
        marginLeft: theme.spacing(2)
    }
}))





const PeronasView = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const iglesia = useSelector(store => store.general.iglesia)
    const { usuario } = useSelector(store => store.auth)
    const usuariosList = useSelector(store => store.personas.personas)
    const catalogos = useSelector(store => store.catalogos)
    //const loading = useSelector(store => store.personas.loading)
    const headCells = [
        { id: 'completo', label: 'Nombre' },
        { id: 'email', label: 'Correo Electrónico', hidden: true },
        { id: 'telefono', label: 'Teléfono', hidden: true },
        { id: 'createdAt', label: 'Fecha de Registro', hidden: true }
    ]

    const [sortMenu, setSortMenu] = useState('')
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(usuariosList, headCells, filterFn)

    useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPersonas(iglesia))
            dispatch(obtenerCatalogosPersonas())
        }
        fetchData()
    }, [dispatch, iglesia])

    const handleSearch = e => {
        let target = e.target.value.toLowerCase()
        setFilterFn({
            fn: items => {
                if (target === "")
                    return items
                else
                    return items.filter(x => x.completo.toLowerCase().includes(target))
            }
        })
    }



    const abrirDetalle = item => {
        dispatch(cargaPersona(item._id))
            .then(() => {
                /* navigate('/app/personadetalle'); */
                navigate(`/app/personas/${item._id}`)
            })
    }



    return (
        <Page
            className={classes.root}
            title="Lista de Personas"
        >
            <Titulo
                title="Lista de Persona"
                btnType={usuario.rol === 'consulta' ? 'no' : 'add'}
                btnText="NUEVA PERSONA"
                icono='add'
                to='/app/addpersona'
            />

            <ImportExport
                classes={classes}
                usuariosList={filterFn.fn(usuariosList)}
                iglesia={iglesia}
            />

            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>

                        <Toolbar
                            usuariosList={usuariosList}
                            filterFn={filterFn}
                            handleSearch={handleSearch}
                            sortMenu={sortMenu}
                            iglesia={iglesia}
                            setSortMenu={setSortMenu}
                            setFilterFn={setFilterFn}
                            catalogos={catalogos}
                        />

                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} onClick={() => abrirDetalle(item)} >
                                                <TableCell>
                                                    <Box
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            src={item.imagen?.url}
                                                        >
                                                            {getInitials(item.completo)}
                                                        </Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                        >
                                                            {item.completo}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <Hidden xsDown>
                                                    <TableCell>{item.email}</TableCell>
                                                    <TableCell>{item.telefono}</TableCell>
                                                    <TableCell>
                                                        {moment(item.createdAt).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                </Hidden>
                                            </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                                <TblPagination />

                            </Box>
                        </PerfectScrollbar>

                    </Card>
                </Box>
            </Container >
        </Page >
    )
}

export default PeronasView

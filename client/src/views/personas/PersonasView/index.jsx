import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import { obtenerPersonas, obtenerInactivos } from 'src/redux/personasDucks'
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
    Typography
} from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import getInitials from 'src/utils/getInitials'
import Tabla from 'src/components/Tabla'
import Toolbar from './Toolbar'
//import data from './data';


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

const menuItems = [
    { value: 'Todos', label: 'Todos' },
    { value: 'bautizado', label: 'Bautizado' },
    { value: 'Miembro', label: 'Miembro' },
    { value: 'Visita', label: 'Visita' },
    { value: 'En Proceso', label: 'En Proceso' },
    { value: 'Adulto', label: 'Adulto' },
    { value: 'Adolescente', label: 'Adolescente' },
    { value: 'Niño', label: 'Niño' },
    { value: 'Hombre', label: 'Hombre' },
    { value: 'Mujer', label: 'Mujer' },
    { value: 'Inactivos', label: 'Inactivos' }

]

const headCells = [
    { id: 'completo', label: 'Nombre' },
    { id: 'email', label: 'Correo Electrónico' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'createdAt', label: 'Fecha de Registro' }
]

const PeronasView = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const iglesia = useSelector(store => store.general.iglesia)
    const { usuario } = useSelector(store => store.auth)
    const usuariosList = useSelector(store => store.personas.personas)
    //const loading = useSelector(store => store.personas.loading)
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
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items
                else
                    return items.filter(x => x.completo.toLowerCase().includes(target.value))
            }
        })
    }

    const handleSortChange = (e, value) => {
        let filtro = e.target.value


        filtro === 'Inactivos' ?
            dispatch(obtenerInactivos(iglesia))
            :
            dispatch(obtenerPersonas(iglesia))

        setSortMenu(filtro)
        setFilterFn({
            fn: items => {
                switch (filtro) {
                    case 'En Proceso':
                    case 'Visita':
                    case 'Miembro':
                        return items.filter(x => x.tipoMiembro?.tipo.includes(filtro))
                    case 'bautizado':
                        return items.filter(x => x.bautismo.activo === true)
                    case 'Hombre':
                    case 'Mujer':
                        return items.filter(x => x.sexo.includes(filtro))
                    case 'Adolescente':
                    case 'Adulto':
                    case 'Niño':
                        return items.filter(x => x.grupoEdad.includes(filtro))
                    default:
                        return items
                }
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
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>

                        <Toolbar
                            usuariosList={usuariosList}
                            filterFn={filterFn}
                            handleSearch={handleSearch}
                            sortMenu={sortMenu}
                            menuItems={menuItems}
                            handleSortChange={handleSortChange}
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
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.telefono}</TableCell>
                                                <TableCell>
                                                    {moment(item.createdAt).format('DD/MM/YYYY')}
                                                </TableCell>
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

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNotificacion } from 'src/redux/notifyDucks'
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    Box,
    Container,
    Card,
    Grid,
    Avatar,
    Typography,
    colors
} from '@material-ui/core'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import Tabla from 'src/components/Tabla'
import Controls from 'src/components/controls/Controls'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { obtenerIglesias, borraIglesia } from 'src/redux/iglesiasDucks'
import ConfirmDialog from 'src/components/ConfirmDialog'
import getInitials from 'src/utils/getInitials'
import SearchIcon from '@material-ui/icons/Search'


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
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    avatar: {
        marginRight: theme.spacing(2),
        color: theme.palette.getContrastText(colors.deepOrange[500]),
        backgroundColor: colors.deepOrange[500],
    }
}))

const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'pastor', label: 'Pastor' },
    { id: 'ciudad', label: 'Ciudad' },
    { id: 'pais', label: 'País' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const IglesiasView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const iglesiasList = useSelector(store => store.iglesias.datos)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(iglesiasList, headCells, filterFn)

    useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerIglesias())
        }
        fetchData()

    }, [dispatch])

    const handleSearch = e => {
        let target = e.target.value.toLowerCase()
        setFilterFn({
            fn: items => {
                if (target === "")
                    return items
                else
                    return items.filter(x => x.nombre.toLowerCase().includes(target))
            }
        })
    }
    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(borraIglesia(item))
        dispatch(addNotificacion(`Se borró ${item.nombre}`, true, 'success'))

    }

    return (
        <Page
            className={classes.root}
            title="Catálogo de Iglesias"
        >
            <Titulo
                title="Catálogo de Iglesias"
                btnText="NUEVA IGLESIA"
                to="/app/detalleiglesia"
            />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>
                        <Box p={2}>
                            <Grid
                                container
                                spacing={2}
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Controls.Input
                                        fullWidth
                                        placeholder="Buscar Iglesia"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                        onInput={e => handleSearch(e)}
                                    />
                                </Grid>
                                <Grid>

                                </Grid>

                            </Grid>
                        </Box>
                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} >
                                                <TableCell>
                                                    <Box
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            src={item.imagen?.url}
                                                        >
                                                            {getInitials(item.nombre)}
                                                        </Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                        >
                                                            {item.nombre}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{item.cobertura}</TableCell>
                                                <TableCell>{item.pastor}</TableCell>
                                                <TableCell>{item.ciudad}</TableCell>
                                                <TableCell>{item.pais}</TableCell>
                                                <TableCell>{item.contacto}</TableCell>
                                                <TableCell>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                        onClick={() => { navigate('/app/detalleiglesia', { state: { recordForEdit: item } }) }}
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: '¿Estas seguro de borrar el registro?',
                                                                subTitle: "No podrás deshacer esta acción",
                                                                type: "alerta",
                                                                onConfirm: () => { onDelete(item) }
                                                            })
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </Controls.ActionButton>
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
            </Container>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </Page>
    )
}

export default IglesiasView

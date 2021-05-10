import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traeCatalogo, borrarTipo } from 'src/redux/catalogosCustomDucks'
import { useParams } from 'react-router-dom'
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
    Slide
} from '@material-ui/core'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import Tabla from 'src/components/Tabla'
import Controls from 'src/components/controls/Controls'
import SearchIcon from '@material-ui/icons/Search'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Popup from 'src/components/Popup'
import Registro from './Registro'

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
    }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

const headCells = [
    { id: 'tipo', label: 'TIPO' },
    { id: 'actions', label: 'OPCIONES', disableSorting: true, align: 'right' }
]


const EdicionView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { idcatalogo } = useParams()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const CatalogosCustom = useSelector(store => store.catalogosCustom.catalogo)
    const iglesia = useSelector(store => store.general.iglesia)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(CatalogosCustom, headCells, filterFn)

    const TIPO_CATALOGO = {
        tiposmiembros: "Tipos de Miembros",
        grupoedades: "Grupo de Edades",
        tiposministerios: "Tipos de Ministerios"
    }

    useEffect(() => {
        const fetchData = () => {
            dispatch(traeCatalogo(idcatalogo))
        }
        fetchData()

    }, [dispatch, idcatalogo])

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items
                else
                    return items.filter(x => x.tipo.toLowerCase().includes(target.value))
            }
        })
    }
    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(borrarTipo(idcatalogo, item))
        dispatch(addNotificacion(`Se borró tipo ${item.tipo}`, true, 'success'))

    }

    const editInPopup = item => {
        // item && console.log('trae datos', item);
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <Page
            className={classes.root}
            title={TIPO_CATALOGO[idcatalogo]}
        >
            <Titulo
                title={TIPO_CATALOGO[idcatalogo]}
                btnText="NUEVO TIPO"
                btnType='edit'
                icono='add'
                onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
            />
            <Container maxWidth={false}>
                <Grid container >
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                    >
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
                                            xs={12}
                                        >
                                            <Controls.Input
                                                fullWidth
                                                placeholder="Buscar Tipo"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon color="primary" />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={handleSearch}
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
                                                        <TableCell>{item.tipo}</TableCell>
                                                        <TableCell align="right">
                                                            <Controls.ActionButton
                                                                color="secondary"
                                                                onClick={() => { editInPopup(item) }}
                                                            >
                                                                <EditOutlinedIcon fontSize="small" />
                                                            </Controls.ActionButton>
                                                            <Controls.ActionButton
                                                                color="secondary"
                                                                onClick={() => {
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: '¿Estas seguro de borrar el registro?',
                                                                        subTitle: "No podrás deshacer esta acción y esto puede AFECTAR registros de personas donde ya se haya utilizado este tipo",
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
                    </Grid>
                </Grid>
            </Container>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />


            <Popup
                title="Tipo Nuevo"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                Transition={Transition}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <Registro
                    notif={addNotificacion}
                    setOpenPopup={setOpenPopup}
                    iglesia={iglesia}
                    idcatalogo={idcatalogo}
                    recordForEdit={recordForEdit}
                />
            </Popup>

        </Page>
    )
}

export default EdicionView

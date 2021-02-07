import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    SvgIcon,
    Fab,
    Box,
    Container,
    Card,
    CardContent
} from '@material-ui/core';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar';
import Tabla from 'src/components/Tabla';
import Controls from 'src/components/controls/Controls';
import { Search as SearchIcon } from 'react-feather';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Registro from './Registro';
import Notificacion from 'src/components/Notification';
import Popup from 'src/components/Popup';
import data from './data';

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
}));

const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'denom', label: 'Cobertura' },
    { id: 'pastor', label: 'Pastor' },
    { id: 'ciudad', label: 'Ciudad' },
    { id: 'pais', label: 'País' },
    { id: 'telefono', label: 'Contacto' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];

const IglesiasView = () => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [recordForEdit] = useState(null)
    const usuariosList = data;

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(usuariosList, headCells, filterFn);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.nombre.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <Page
            className={classes.root}
            title="Usuarios"
        >
            <Titulo title="Catálogos de Iglesias" />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Box maxWidth={500}>
                                <Controls.Input
                                    fullWidth
                                    placeholder="Buscar Iglesia"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="action"
                                                >
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleSearch}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={3}>
                    <Card>
                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} >
                                                <TableCell>{item.nombre}</TableCell>
                                                <TableCell>{item.denom}</TableCell>
                                                <TableCell>{item.pastor}</TableCell>
                                                <TableCell>{item.ciudad}</TableCell>
                                                <TableCell>{item.pais}</TableCell>
                                                <TableCell>{item.telefono}</TableCell>
                                                <TableCell>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                    /* onClick={() => { openInPopup(item) }} */
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                    /* onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Estas seguro de borrar el registro?',
                                                            subTitle: "No podrás deshacer esta acción",
                                                            onConfirm: () => { onDelete(item) }
                                                        })
                                                    }} */
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
                <Fab color="primary"
                    aria-label="add"
                    className={classes.fab}
                    component={NavLink}
                    to='/app/addiglesia'
                //onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                >
                    <AddIcon />
                </Fab>
            </Container>

            <Popup
                title="Formulario de Usuario"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Registro
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    recordForEdit={recordForEdit} />
            </Popup>
            <Notificacion
                notify={notify}
                setNotify={setNotify}
            />

        </Page>
    )
}

export default IglesiasView

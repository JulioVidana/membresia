import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cargaPersona } from 'src/redux/personaDetalleDucks';
import moment from 'moment';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar';
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    SvgIcon,
    Box,
    Container,
    Card,
    CardContent,
    Avatar,
    Typography,
    Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from 'src/utils/getInitials';
import Tabla from 'src/components/Tabla';
import Controls from 'src/components/controls/Controls';
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
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'email', label: 'Correo Elctrónico' },
    { id: 'phone', label: 'Teléfono' },
    { id: 'createdAt', label: 'Fecha de Registro' }
];

const PeronasView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
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

    const abrirDetalle = item => {
        dispatch(cargaPersona(item))
            .then(() => {
                navigate('/app/personadetalle');
            })
    }

    return (
        <Page
            className={classes.root}
            title="Lista de Personas"
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
                                        placeholder="Buscar Persona"
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
                                            (<TableRow key={item._id} onClick={() => abrirDetalle(item)} >
                                                <TableCell>
                                                    <Box
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            src={item.avatarUrl}
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
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.phone}</TableCell>
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

            </Container>
        </Page>
    )
}

export default PeronasView

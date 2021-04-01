import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { actualizaTipoMiembro, borrarPersona } from 'src/redux/personaDetalleDucks'
import {
    Grid,
    makeStyles,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    colors,
    Button,
    Paper
} from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { addNotificacion } from 'src/redux/notifyDucks'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Inactivo from './Inactivo'



const useStyles = makeStyles((theme) => ({
    root: {},
    button: {
        margin: theme.spacing(1),
    },
    menu: {
        //marginBottom: 5,
        //width: 160,
        //height: 55
        paddingTop: 0,
        paddingBottom: 0
    },
    listaIcon: {
        minWidth: 25,
        color: colors.red[500]
    },
    grids: {
        marginBottom: 5,
        textAlign: 'center'
    },
    paperBtn: {
        //width: 160,
        height: 45,
        textAlign: 'center'

    }
}));


const Ajustes = ({ tiposMiembro, idMiembro, idUsuario, setOpenPopupEs, setOpenPopupBa, estatus }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const busca = valor => tiposMiembro.find(({ _id }) => {
        return _id === valor
    })

    const [tipo, setTipo] = useState(!idMiembro ? {} : busca(idMiembro))
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })


    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuItemClick = (event, valor) => {
        setTipo(valor)
        dispatch(actualizaTipoMiembro(idUsuario, valor))
            .then(() => {
                dispatch(addNotificacion('Se cambió Tipo de Miembro', true, 'success'))
            })
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget)
    };
    const handleClose2 = () => {
        setAnchorEl2(null)
    };

    const openEstatus = () => {
        setAnchorEl2(null)
        setOpenPopupEs(true)
    }

    const openBautismo = () => {
        setAnchorEl2(null)
        setOpenPopupBa(true)
    }

    const onDelete = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(borrarPersona(idUsuario))
            .then(() => {
                dispatch(addNotificacion('Se borró', true, 'success'))
                setAnchorEl2(null)
                navigate('/app/personas')
            })
    }

    return (
        <Grid
            container
            spacing={1}
            className={classes.grids}
        >
            {
                !estatus.activo &&
                <Grid
                    item
                    xs={12}
                    md={7}
                    lg={7}
                >
                    <Inactivo
                        estatus={estatus}
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </Grid>
            }


            <Grid
                item
                lg={3}
            >
                <Paper variant="outlined" >
                    <List
                        component="nav"
                        aria-label="Device settings"
                        className={classes.menu}
                    >
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            onClick={handleClickListItem}
                        >
                            <ListItemIcon className={classes.listaIcon}>
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={!idMiembro ? 'Tipo de Miembro' : tipo.tipo} />
                            <ExpandMore />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        {tiposMiembro.map((option) => (
                            <MenuItem
                                key={option._id}
                                selected={option._id === tipo._id}
                                onClick={(event) => handleMenuItemClick(event, option)}
                            >
                                {option.tipo}
                            </MenuItem>
                        ))}
                    </Menu>
                </Paper>
            </Grid>
            <Grid
                item
                lg={2}
            >
                <Paper variant="outlined" className={classes.paperBtn}  >
                    <Button
                        fullWidth
                        size='large'
                        color="secondary"
                        startIcon={<SettingsIcon />}
                        onClick={handleClick2}
                    >
                        {<ExpandMore />}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                    >
                        <MenuItem onClick={() => { openBautismo() }}>Bautismo</MenuItem>
                        <MenuItem onClick={() => { openEstatus() }}>Inactivo</MenuItem>
                        <MenuItem onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: '¿Estas seguro de borrar Persona?',
                                subTitle: "Se eliminará todo registro e historial y NO podrás deshacer esta acción",
                                type: "alerta",
                                onConfirm: () => { onDelete() }
                            })
                        }}
                        >Borrar</MenuItem>
                    </Menu>

                </Paper>

            </Grid>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </Grid>

    )
}

export default Ajustes

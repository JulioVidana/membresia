import React, { useState } from 'react'
import {
    makeStyles,
    MenuItem,
    Button,
    Typography,
    Divider,
    Avatar,
    Popper,
    Paper,
    Grow,
    MenuList,
    ClickAwayListener,
    ListItem
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { logout } from 'src/redux/authDucks'
import { useDispatch, connect } from 'react-redux'

const useStyles = makeStyles(() => ({
    avatar: {
        cursor: 'pointer',
        width: 30,
        height: 30
    },
    menuInfo: {
        paddingTop: 10,
        paddingLeft: 15,
        marginBottom: 10
    }
}))

const MenuUser = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const anchorRef = React.useRef(null)
    const { usuario } = props

    const salir = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpenMenu(false)
    }

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    const irAPerfil = () => {
        navigate('/app/account', { replace: true })
        setOpenMenu(false)
    }
    return (
        <div>
            <Button
                ref={anchorRef}
                onClick={handleToggle}
                size='small'
            >
                <Avatar
                    className={classes.avatar}
                    src={usuario.imagen?.url}
                />
            </Button>
            <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <div className={classes.menuInfo} disabled >
                                        <Typography
                                            className={classes.name}
                                            color="textPrimary"
                                            variant="h6"
                                        >
                                            {usuario?.nombre}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            {usuario?.rol}
                                        </Typography>
                                    </div>
                                    <Divider />
                                    <MenuItem
                                        onClick={irAPerfil}
                                    >
                                        Mi Perfil
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>Ajustes</MenuItem>
                                    <ListItem>
                                        <Button
                                            variant="contained"
                                            onClick={salir}
                                        >
                                            Cerrar Sesión
                                        </Button>
                                    </ListItem>

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps)(MenuUser)

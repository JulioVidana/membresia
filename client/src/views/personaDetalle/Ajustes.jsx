import React, { useState } from 'react';
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
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMore from '@material-ui/icons/ExpandMore';


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

const options = [
    'Tipo de Miembro',
    'Miembro',
    'Visita',
    'VIP',
    'En Proceso'
];

const Ajustes = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <Grid
            container
            spacing={1}
            className={classes.grids}
        >
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
                            <ListItemText primary={options[selectedIndex]} />
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
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
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
                        <MenuItem onClick={handleClose2}>Bautizmo</MenuItem>
                        <MenuItem onClick={handleClose2}>Inactivo</MenuItem>
                        <MenuItem onClick={handleClose2}>Borrar</MenuItem>
                    </Menu>

                </Paper>

            </Grid>
        </Grid>

    )
}

export default Ajustes

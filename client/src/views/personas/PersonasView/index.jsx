import React from 'react';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar';
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
const PeronasView = () => {
    const classes = useStyles();
    return (
        <Page
            className={classes.root}
            title="Lista de Personas"
        >
            <Titulo title="Lista de Personas" />
        </Page>
    )
}

export default PeronasView

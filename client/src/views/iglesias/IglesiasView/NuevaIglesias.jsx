import React from 'react';
import {
    Container,
    Box,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Registro from './Registro';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const NuevaIglesia = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Agregar Iglesia"
        >
            <Container maxWidth="lg">
                <Registro />
            </Container>
        </Page>
    );
};

export default NuevaIglesia;

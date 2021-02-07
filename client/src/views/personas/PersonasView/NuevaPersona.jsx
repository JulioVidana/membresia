import React from 'react';
import {
    Container,
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

const NuevaPersona = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Agregar Persona"
        >
            <Container maxWidth="lg">
                <Registro />
            </Container>
        </Page>
    );
};

export default NuevaPersona;

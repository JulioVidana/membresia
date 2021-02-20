import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import { useLocation } from 'react-router-dom';
import { addNotificacion } from 'src/redux/notifyDucks'
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
    const dispatch = useDispatch()
    //const [selectedDate, handleDateChange] = useState(new Date());
    const [editar, setEditar] = useState(false);
    const catalogos = useSelector(store => store.catalogos);
    const iglesia = useSelector(store => store.general.iglesia);
    const location = useLocation();
    const initialFValues = {
        _id: 0,
        nombre: '',
        aPaterno: '',
        grupoEdad: '',
        genero: '',
        iglesia: iglesia,
    }
    const [values, setValues] = useState(initialFValues);


    //console.log('DATE:', selectedDate)
    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerCatalogosPersonas())
        }
        fetchData()

        if (location.state != null) {
            setEditar(true);
            setValues({
                ...location.state.recordForEdit
            })

        }

    }, [dispatch, location])
    return (
        <Page
            className={classes.root}
            title="Agregar Persona"
        >
            <Container maxWidth="lg">
                <Registro
                    catalogos={catalogos}
                    values={values}
                    editar={editar}
                    generos={catalogos.generos}
                    civil={catalogos.edoCivil}
                    edades={catalogos.grupoEdades}
                    escolaridad={catalogos.escolaridad}
                    notif={addNotificacion}
                />
            </Container>
        </Page>
    );
};

export default NuevaPersona;

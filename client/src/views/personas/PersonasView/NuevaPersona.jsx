import React from 'react';
import { useSelector } from 'react-redux'
import { addNotificacion } from 'src/redux/notifyDucks'
import {
    Container,
    makeStyles,
    Card,
    CardHeader,
    CardContent,
    Divider
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
    //const [selectedDate, handleDateChange] = useState(new Date());
    const catalogos = useSelector(store => store.catalogos);
    const { generos, edoCivil, grupoEdades, escolaridad } = catalogos
    const iglesia = useSelector(store => store.general.iglesia);

    const initialFValues = {
        _id: 0,
        nombre: '',
        aPaterno: '',
        aMaterno: '',
        grupoEdad: '',
        email: '',
        telefono: '',
        ciudad: '',
        calle: '',
        colonia: '',
        cp: '',
        sexo: '',
        iglesia: iglesia._id,
        oficio: '',
        civil: edoCivil[0],
        escolaridad: escolaridad[0]
    }


    return (
        <Page
            className={classes.root}
            title="Agregar Persona"
        >
            <Container maxWidth="lg">
                <Card>
                    <CardHeader
                        title="Agregar Persona"
                        subheader="Datos Básicos"
                    />
                    <Divider />
                    <CardContent>
                        <Registro
                            values={initialFValues}
                            editar={false}
                            generos={generos}
                            civil={edoCivil}
                            edades={grupoEdades}
                            escolaridad={escolaridad}
                            notif={addNotificacion}
                        />
                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
};

export default NuevaPersona;

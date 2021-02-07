import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Grid,
    makeStyles,
    Box,
    Tab,
    Tabs,
    Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Famila from './Familia';
import Notas from './Notas';
import Actividad from './Actividad';
import Ajustes from './Ajustes';
import Titulo from 'src/components/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box mt={2}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PersonaDetalle = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const personaData = useSelector(store => store.personaDetalle);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page
            className={classes.root}
            title="Account"
        >
            <Titulo
                title="Detalle Persona"
                btnText="EDITAR"
                icono='edit'
                to='/app/addpersona'
            />

            <Container maxWidth={false}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="GENERAL" {...a11yProps(0)} />
                    <Tab label="NOTAS" {...a11yProps(1)} />
                    <Tab label="ACTIVIDAD" {...a11yProps(2)} />
                </Tabs>
                <Divider />
                <TabPanel value={value} index={0}>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <Profile datos={personaData.persona} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={8}
                            xs={12}
                        >
                            <Ajustes />
                            <ProfileDetails datos={personaData.persona} />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <Famila datos={personaData.persona} />
                        </Grid>
                    </Grid>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Notas datos={personaData.persona} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Actividad />
                </TabPanel>

            </Container>

        </Page>

    );
};

export default PersonaDetalle;

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import TodayIcon from '@material-ui/icons/Today';
import SchoolIcon from '@material-ui/icons/School';


const useStyles = makeStyles((theme) => ({
    root: {},
    statsIcon: {
        marginRight: 5
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: theme.spacing(2)
    },
    texto: {
        marginLeft: 20
    },

}));


const ProfileDetails = ({ className, datos, ...rest }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                title="Información personal"
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    wrap="wrap"
                >
                    <Grid
                        className={classes.statsItem}
                        item
                        sm={7}
                        xs={12}
                    >
                        <MailIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Correo:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {datos.email}
                        </Typography>

                    </Grid>

                    <Grid
                        className={classes.statsItem}
                        item
                        sm={5}
                        xs={12}
                    >
                        <TodayIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Nacimiento:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {moment(datos.nacimiento).format('LL')}
                        </Typography>

                    </Grid>

                    <Grid
                        className={classes.statsItem}
                        item
                        sm={7}
                        xs={12}
                    >
                        <PhoneIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Teléfono:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {datos.phone}
                        </Typography>

                    </Grid>
                    <Grid
                        className={classes.statsItem}
                        item
                        sm={5}
                        xs={12}
                    >
                        <WorkIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Oficio:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {datos.oficio}
                        </Typography>

                    </Grid>

                    <Grid
                        className={classes.statsItem}
                        item
                        sm={12}
                        xs={12}
                    >
                        <LocationOnIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Dirección:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {
                                datos.address &&
                                `${datos.address.calle}, ${datos.address.colonia}, ${datos.address.ciudad}, ${datos.address.cp}`
                            }
                        </Typography>

                    </Grid>
                    {/*  <Grid
                        className={classes.statsItem}
                        item
                        sm={5}
                        xs={12}
                    >
                        <SchoolIcon
                            className={classes.statsIcon}
                            color="secondary"
                        />
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Escolaridad:
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className={classes.texto}
                            variant="h5"
                        >
                            {datos.education}
                        </Typography>

                    </Grid>
 */}


                </Grid>



            </CardContent>
            <Divider />

        </Card>

    );
};

ProfileDetails.propTypes = {
    className: PropTypes.string
};

export default ProfileDetails;

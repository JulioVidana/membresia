import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Divider,
    Grid,
    makeStyles,
    Typography,
    Box,
    colors
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import TodayIcon from '@material-ui/icons/Today';
import SchoolIcon from '@material-ui/icons/School';
import Ajustes from './ajustes/Ajustes'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import 'moment/locale/es-mx'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
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
    siBautismo: {
        marginLeft: 10,
        color: colors.green[600]
    },
    noBautismo: {
        marginLeft: 10,
        color: colors.red[600]
    }

}));


const ProfileDetails = ({ className, datos, ...rest }) => {
    const classes = useStyles()
    /* const direcc = (calle, colonia, ciudad, cp) => {
       let direccion = ''
       if (calle !== '') { direccion = direccion + calle }
       if (colonia !== '') { direccion = direccion + ', ' + colonia }
       if (ciudad !== '') { direccion = direccion + ', ' + ciudad }
       if (cp !== '') { direccion = direccion + ', ' + cp }
       return direccion
   }  */


    return (
        <Box className={classes.root}>

            <Ajustes
                tiposMiembro={rest.tiposMiembro}
                idMiembro={datos.tipoMiembro?._id}
                idUsuario={datos._id}
                setOpenPopupEs={rest.setOpenPopupEs}
                setOpenPopupBa={rest.setOpenPopupBa}
                estatus={datos.estatus}
            />

            <Card >

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
                                {moment(datos.nacimiento).format('ll')}
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
                                {datos.telefono}
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
                                    //direcc(datos.calle, datos.colonia, datos.ciudad, datos.cp)
                                    `${datos.calle} ${datos.colonia} ${datos.ciudad} ${datos.cp}`
                                }
                            </Typography>

                        </Grid>
                        <Grid
                            className={classes.statsItem}
                            item
                            sm={7}
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
                                {datos.escolaridad.escolaridad}
                            </Typography>

                        </Grid>
                        <Grid
                            className={classes.statsItem}
                            item
                            sm={5}
                            xs={12}
                        >
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Bautizado:
                        </Typography>
                            {
                                datos.bautismo.activo ?
                                    <CheckCircleIcon className={classes.siBautismo} />
                                    :
                                    <CancelIcon className={classes.noBautismo} />

                            }


                        </Grid>



                    </Grid>



                </CardContent>
                <Divider />

            </Card>
        </Box>
    );
};

ProfileDetails.propTypes = {
    className: PropTypes.string
};

export default ProfileDetails;

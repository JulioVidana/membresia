import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Grid
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        height: 100,
        width: 100
    },
    statsIcon: {
        //marginRight: theme.spacing(1)
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: theme.spacing(1)
    },
}));

const Profile = ({ className, datos, setOpenPopup, ...rest }) => {
    const classes = useStyles();
    const { completo, civil, sexo, nacimiento } = datos

    function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={classes.avatar}
                        src={datos.imagen?.url}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                        align="center"
                    >
                        {completo}
                    </Typography>

                    <Grid item className={classes.statsItem}>
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            {`${civil.estado} - ${sexo} - ${nacimiento === undefined || nacimiento === null ? 0 : getAge(nacimiento)} años`}
                        </Typography>
                    </Grid>

                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    size="large"
                    onClick={() => { setOpenPopup(true) }}
                >
                    Editar Imagen
                </Button>
            </CardActions>
        </Card>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;

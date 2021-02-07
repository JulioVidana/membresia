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
    root: {},
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

const Profile = ({ className, datos, ...rest }) => {
    const classes = useStyles();
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
                        src={datos.avatarUrl}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        {datos.nombre}
                    </Typography>

                    <Grid item className={classes.statsItem}>
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            {`${datos.eCivil} - ${datos.genero} - ${datos.edad} años`}
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

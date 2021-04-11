import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: '#373c4a',
        height: 56,
        width: 56
    }
}));

const TotalPersonas = ({ className, total, ...rest }) => {
    const classes = useStyles();

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            TOTAL PERSONAS
            </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {total}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <GroupIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TotalPersonas.propTypes = {
    className: PropTypes.string
};

export default TotalPersonas;

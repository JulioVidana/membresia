import React from 'react'

import { makeStyles, Typography, Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    Titulo: {
        marginBottom: theme.spacing(2),
        //marginRight: theme.spacing(1)
    },


}));

const Toolbar = (props) => {
    const classes = useStyles();
    const { title } = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={3}  >
                <Grid item xs={10}>
                    <Typography
                        variant="h3"
                        color="textPrimary"
                        component="div"
                        className={classes.Titulo} >
                        {title}
                    </Typography>

                </Grid>
            </Grid>
            <Divider />


        </div>
    )
}

export default Toolbar

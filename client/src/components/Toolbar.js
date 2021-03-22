import React from 'react'
import { NavLink } from 'react-router-dom';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';

import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(3),
        paddingRight: 27
        //marginRight: theme.spacing(4)
    },
    Titulo: {
        marginBottom: theme.spacing(0),
        //marginRight: theme.spacing(1)
    },


}));

const Toolbar = (props) => {
    const classes = useStyles();
    const { title, btnText, btnType, icono = 'add', to, onClick } = props;
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="space-between"
                alignItems="center"
            >
                <Grid
                    item
                >
                    <Typography
                        variant="h3"
                        color="textPrimary"
                        component="div"
                        className={classes.Titulo} >
                        {title}
                    </Typography>

                </Grid>
                {
                    btnType === 'edit' ?
                        <Grid
                            item
                        >
                            <Controls.Button
                                fullWidth
                                text={btnText}
                                variant="contained"
                                startIcon={icono === 'add' ? <AddIcon /> : <EditIcon />}
                                onClick={onClick}

                            />
                        </Grid>
                        :
                        <Grid
                            item
                        >
                            <Controls.Button
                                fullWidth
                                text={btnText || "AGREGAR"}
                                variant="contained"
                                startIcon={icono === 'add' ? <AddIcon /> : <EditIcon />}
                                component={NavLink}
                                to={to || "null"}
                            />
                        </Grid>
                }


            </Grid>
            {/*  <Divider /> */}


        </div>
    )
}

export default Toolbar

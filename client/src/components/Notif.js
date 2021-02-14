import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { clearNotificacion } from 'src/redux/notifyDucks';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';


const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(9)
    }
}));

const Notif = (props) => {
    const dispatch = useDispatch();
    const { notify } = props;
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearNotificacion())
    }

    return (

        notify.isOpen ?

            <Snackbar
                key={uuid()}
                className={classes.root}
                open={notify.isOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}
            >
                <Alert
                    variant="filled"
                    severity={notify.type}
                    onClose={handleClose}
                >
                    {notify.msg}
                </Alert>
            </Snackbar>
            :

            null
    )

}

const mapStateToProps = (state) => ({
    notify: state.notificacion
})

export default connect(mapStateToProps)(Notif);

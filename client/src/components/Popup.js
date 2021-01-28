import React from 'react';
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import Controls from './controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: theme.spacing(2)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    lista: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup, fullWidth, fullScreen } = props;
    const classes = useStyles();
    return (
        <Dialog fullScreen={fullScreen} open={openPopup} maxWidth="lg" fullWidth={fullWidth} classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="closeButton"
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup

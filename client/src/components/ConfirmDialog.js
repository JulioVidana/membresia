import React from 'react'
import { Dialog, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import Controls from "./controls/Controls";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: theme.spacing(15)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center',
        '&:first-child': {
            // dialog without title
            paddingTop: 0,
        },
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: theme.palette.error.main,
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    },
    titleIcon1: {
        color: theme.palette.secondary.main,
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    },
    btnAlerta: {
        backgroundColor: theme.palette.error.main,
        '&:hover': { backgroundColor: theme.palette.error.dark }
    },
    btnDialog: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': { backgroundColor: theme.palette.primary.dark }
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogContent className={classes.dialogContent}>
                {
                    confirmDialog.type === 'alerta' ?
                        <IconButton disableRipple className={classes.titleIcon}>
                            <HighlightOffIcon />
                        </IconButton>
                        :
                        <IconButton disableRipple className={classes.titleIcon1}>
                            <HelpOutlineIcon />
                        </IconButton>
                }

                <Typography variant="h4">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle1">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Yes"
                    className={confirmDialog.type === 'alerta' ? classes.btnAlerta : classes.btnDialog}
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
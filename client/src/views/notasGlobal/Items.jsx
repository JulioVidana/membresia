import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import { borraNotaGlobal } from 'src/redux/notasDucks'
import { addNotificacion } from 'src/redux/notifyDucks'
import getInitials from 'src/utils/getInitials'
import {
    Box,
    Typography,
    makeStyles,
    Grid,
    Paper,
    Chip,
    IconButton,
    Avatar,
    Link
} from '@material-ui/core'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'
import DOMpurify from 'dompurify'

const useStyles = makeStyles((theme) => ({
    root: {},
    form: {
        paddingTop: theme.spacing(2),
    },
    pageContent: {
        padding: '16px 16px 0px 16px',
        background: '#F2F2F5',
        marginBottom: theme.spacing(2)
    },
    margin: {
        margin: theme.spacing(0),
        color: '#f44336'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    nota: {
        paddingLeft: theme.spacing(7)
    }
}))

const Items = ({ nota, setConfirmDialog, confirmDialog, dispatch, setCsvNota, stateData }) => {
    const classes = useStyles()
    const dispatchRdx = useDispatch()
    const navigate = useNavigate()
    const createMarkup = html => {
        return { __html: DOMpurify.sanitize(html) }
    }


    const abrirDetalle = item => {
        dispatchRdx(cargaPersona(item._id))
            .then(() => {
                /* navigate('/app/personadetalle'); */
                navigate(`/app/personas/${item._id}`)
            })
    }

    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatchRdx(borraNotaGlobal(item))
            .then(() => {
                dispatchRdx(addNotificacion(`SE BORRÓ NOTA`, true, 'warning'))
                dispatch({ type: 'SEARCH_INPUT', payload: '' })
                dispatch({ type: 'SEARCH_DATA', payload: [] })
                setCsvNota(stateData)
            })
    }

    return (

        <Paper className={classes.pageContent} >
            <Grid
                container
                justify='flex-end'
            >
                <Chip color="secondary" size="small" label={nota.categoria} />
            </Grid>


            <Grid
                container
                alignItems='flex-start'
            >

                <Grid
                    item
                    xs={12}
                >
                    <Box
                        alignItems="center"
                        display="flex"
                    >
                        <Avatar
                            className={classes.avatar}
                            src={nota.persona?.imagen?.url}
                        >
                            {getInitials(nota.persona?.nombre)}
                        </Avatar>

                        <Link
                            component="button"
                            onClick={() => abrirDetalle(nota.persona)}
                        >
                            <Typography
                                color="primary"
                                variant="h4"
                                dangerouslySetInnerHTML={createMarkup(nota.persona?.completo)}
                            >

                            </Typography>
                        </Link>

                    </Box>
                </Grid>


            </Grid>
            <Box className={classes.nota}>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                    dangerouslySetInnerHTML={createMarkup(nota.nota)}
                >
                </Typography>

            </Box>

            <Grid
                container
                justify="space-between"
                alignItems="center"
            >
                <Grid
                    item
                >
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="caption">
                        {`${moment(nota.fecha).format('LL')} por ${nota.createdBy.nombre}`}
                    </Typography>
                </Grid>
                <Grid
                    item
                >
                    <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: '¿Estas seguro de borrar Nota?',
                                subTitle: "No podrás deshacer esta acción",
                                type: "alerta",
                                onConfirm: () => { onDelete(nota._id) }
                            })
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Grid>

            </Grid>

        </Paper>

    )
}

export default Items

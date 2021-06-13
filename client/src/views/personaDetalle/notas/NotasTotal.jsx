import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { borraNota } from 'src/redux/notasDucks'
import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Grid,
    Paper,
    Chip,
    IconButton
} from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import SortBar from 'src/components/SortBar'
import ConfirmDialog from 'src/components/ConfirmDialog'


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
    filtro: {
        marginBottom: theme.spacing(2)
    }
}))

const categoria = [
    { value: 'Todo', label: 'Todas' },
    { value: 'General', label: 'General' },
    { value: 'Oracion', label: 'Petición Oración' }
]

const NotasTotal = ({ notas, notif }) => {
    const classes = useStyles()
    const [sortMenu, setSortMenu] = useState('')
    const dispatch = useDispatch()
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [lasNotas, setLasNotas] = useState(notas)

    const handleSortChange = (e, value) => {
        let filtro = e.target.value
        setSortMenu(filtro)
        filtro === 'Todo'
            ?
            setLasNotas(notas)
            :
            setLasNotas(notas.filter(x => x.categoria.includes(filtro)))
    }

    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(borraNota(item))
            .then(() => {
                dispatch(notif(`SE BORRÓ NOTA`, true, 'warning'))
            })

    }

    useEffect(() => {
        setLasNotas(notas)
    }, [setLasNotas, notas])
    return (

        <Card >
            <CardContent>
                <Grid
                    container
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid
                        item
                        md={3}
                        xs={6}
                        className={classes.filtro}
                    >
                        <SortBar
                            sortBy={sortMenu}
                            menuItems={categoria}
                            handleSortChange={handleSortChange}
                            label="Notas"
                        />
                    </Grid>

                </Grid>
                <Divider />
                <Box className={classes.form}>

                    {
                        lasNotas.map((item) => (

                            <Paper className={classes.pageContent} key={item._id}>
                                <Grid
                                    container
                                    justify='flex-end'
                                >
                                    <Chip color="secondary" size="small" label={item.categoria} />
                                </Grid>
                                <Grid
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            gutterBottom
                                            variant="h6">
                                            {item.nota}
                                        </Typography>
                                    </Grid>


                                </Grid>
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
                                            {`${moment(item.fecha).locale('es-mx').format('LL')} por ${item.createdBy?.nombre}`}
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
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>

                                </Grid>

                            </Paper>
                        ))
                    }
                </Box>
            </CardContent>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </Card>
    )
}

export default NotasTotal

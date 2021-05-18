import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traeNotasGlobal } from 'src/redux/notasDucks'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import {
    makeStyles,
    colors,
    Container,
    Box,
    CardContent
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Notas from './Global'
import Cargando from './Loading'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    aviso: {
        padding: theme.spacing(2),
        background: colors.red[200]
    }
}))

const NotasView = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const iglesia = useSelector(store => store.general.iglesia)
    const notas = useSelector(store => store.notas.notasGlobal)
    const loading = useSelector(store => store.notas.loading)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [sortMenu, setSortMenu] = useState('')

    useEffect(() => {
        const fetchData = () => {
            dispatch(traeNotasGlobal(iglesia._id))
        }
        fetchData()
    }, [dispatch, iglesia._id])


    return (
        <Page
            className={classes.root}
            title="Notas de personas"
        >
            <Titulo
                title="Notas de Personas"
                btnType='no'
            />
            {
                loading ? (
                    <Cargando />
                ) : (
                    notas.length > 0
                        ?
                        <Notas
                            notas={notas}
                            iglesia={iglesia}
                            confirmDialog={confirmDialog}
                            setConfirmDialog={setConfirmDialog}
                            setSortMenu={setSortMenu}
                            sortMenu={sortMenu}
                        />
                        :
                        <Container>
                            <Box mt={1} mb={1}>
                                <CardContent>
                                    <Box>
                                        <Alert
                                            variant="filled"
                                            severity="warning">
                                            ¡Aún no se han agregado notas!
                                        </Alert>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Container>
                )
            }
        </Page>
    )
}


export default NotasView

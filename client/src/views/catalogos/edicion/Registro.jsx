import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { nuevoTipo, actualizarTipo } from 'src/redux/catalogosCustomDucks'
import {
    Box,
    makeStyles,
    Grid,
    TextField,
    Divider,
    colors,
    Button,
    InputAdornment
} from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import * as Yup from 'yup'



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        flexGrow: 1
        //paddingBottom: theme.spacing(3),
        //paddingTop: theme.spacing(3)
    },
    aviso: {
        padding: theme.spacing(2),
        background: colors.grey[300]
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    }
}))

const validSchema = Yup.object().shape({
    tipo: Yup.string().max(255).required('Falta Texto de Tipo')
})

const Registro = ({ setOpenPopup, notif, iglesia, idcatalogo, recordForEdit }) => {
    const dataInicial = {
        tipo: '',
        iglesia: iglesia._id
    }
    const errorInicial = { error: false, msj: '' }
    const classes = useStyles()
    const dispatch = useDispatch()
    const [datos, setDatos] = useState(dataInicial)
    const [error, setError] = useState(errorInicial)
    const [editar, setEditar] = useState(false)


    useEffect(() => {
        if (recordForEdit != null) {
            setEditar(true)
            setDatos({ ...recordForEdit })
        }
    }, [recordForEdit])

    const onChange = async (nombre, valor) => {
        setDatos({
            ...datos,
            [nombre]: valor
        })

        const isValid = await validSchema.isValid(datos)
        isValid && setError(errorInicial)

    }

    const onSubmit = async (e) => {
        e.preventDefault()

        await validSchema.validate(datos)
            .then(validado => {

                editar
                    ?
                    dispatch(actualizarTipo(idcatalogo, validado))
                        .then(() => {
                            dispatch(notif('Se Actualizó Tipo correctamente', true, 'success'))
                            setOpenPopup(false)
                            setDatos(dataInicial)
                        })
                    :
                    dispatch(nuevoTipo(idcatalogo, validado))
                        .then(() => {
                            dispatch(notif('Se guardó Tipo correctamente', true, 'success'))
                            setOpenPopup(false)
                            setDatos(dataInicial)
                        })


            })
            .catch(err => {
                setError({ error: true, msj: err.errors[0] })
            })


    }
    const cancelar = () => {
        setOpenPopup(false)
        //setFiles([])
    }

    return (
        <form onSubmit={onSubmit} >
            <Box
                className={classes.root}
            >
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Tipo"
                            name="tipo"
                            variant="outlined"
                            value={datos.tipo}
                            onChange={e => onChange('tipo', e.target.value)}
                            error={error.error}
                            helperText={error.msj}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ListIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>


                </Grid>
                <Divider className={classes.espacio} />
                <Grid
                    container
                    spacing={0}
                    justify="flex-end"
                >
                    <Grid
                        item
                        md={3}
                        xs={6}
                    >
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={1}
                        >

                            <Button
                                color="secondary"
                                size="large"
                                onClick={() => cancelar()}
                            >
                                cancelar
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        xs={6}
                    >
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={1}
                        >
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Guardar
                                </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </form>
    )
}

export default Registro

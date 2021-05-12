import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { agregaFamilia, eliminaFamilia, actualizaFamilia } from 'src/redux/familiasDucks'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
    Container,
    TextField,
    InputAdornment,
    Button,
    Divider,
    Grid
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import HouseIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import ConfirmDialog from 'src/components/ConfirmDialog'

const Registro = ({
    setOpenPopup,
    personaData,
    editar,
    personasList,
    values,
    classes,
    cancelar,
    notif,
    familiaStore
}) => {

    const dispatch = useDispatch()
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const buscaPersona = id => personasList.find(({ _id }) => {
        return _id === id
    })


    const onDelete = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(eliminaFamilia(familiaStore._id))
            .then(() => {
                dispatch(notif('Se borró Familia', true, 'success'))
                setOpenPopup(false)
            })
    }

    return (

        <Container maxWidth="sm">
            <Formik
                enableReinitialize={editar}
                initialValues={values}
                validationSchema={
                    Yup.object().shape({
                        familia: Yup.string().max(128).min(6, 'Mínimo 6 caracteres').required('Falta Nombre'),
                    })
                }
                onSubmit={(values) => {
                    editar ?
                        dispatch(actualizaFamilia(values))
                            .then((response) => {
                                //console.log(response)
                                setOpenPopup(false)
                            })
                        :
                        dispatch(agregaFamilia(values))
                            .then(() => {
                                //dispatch(notif('Se agregó Familia', true, 'success'))
                                setOpenPopup(false)
                            })
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    touched,
                    values
                }) => (
                    <form onSubmit={handleSubmit}>

                        <TextField
                            error={Boolean(touched.familia && errors.familia)}
                            fullWidth
                            helperText={touched.familia && errors.familia}
                            label="Nombre de familia"
                            margin="normal"
                            name="familia"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.familia}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HouseIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Autocomplete
                            multiple
                            filterSelectedOptions
                            id="tags-outlined"
                            options={personasList}
                            //defaultValue={[personaData]}
                            defaultValue={
                                editar ?
                                    values.personas.map(({ _id }) => buscaPersona(_id))
                                    :
                                    [buscaPersona(personaData._id)]
                                    || ""
                            }
                            onChange={(e, value) => setFieldValue("personas", value.map((person) => person))
                            }
                            //onChange={(e, value) => setFieldValue("personas", value.map(({ _id }) => _id))}
                            //onChange={(e, value) => setFieldValue("personas", value)}
                            getOptionLabel={(option) => option?.completo}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Selecciona Familia"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment
                                                    position="start"
                                                    style={{ paddingLeft: '0.4em' }}
                                                >
                                                    <GroupIcon color="primary" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Divider className={classes.espacio} />
                        <Grid
                            container
                            justify="flex-end"
                            alignItems="flex-end"
                            direction="row"
                        >
                            {
                                editar &&
                                <Grid
                                    item
                                    md={4}
                                    xs={4}
                                >
                                    <Button
                                        size="large"
                                        className={classes.btnAlerta}
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: '¿Estas seguro de eliminar Familia?',
                                                type: 'alerta',
                                                onConfirm: () => { onDelete() }
                                            })
                                        }}
                                    >Eliminar Familia</Button>

                                </Grid>

                            }
                            <Grid>
                                <Button
                                    color="secondary"
                                    size="large"
                                    onClick={cancelar}
                                >
                                    Cancelar
                            </Button>

                            </Grid>
                            <Grid
                                item
                                md={3}
                                xs={3}

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


                            </Grid>

                        </Grid>


                    </form>
                )}
            </Formik>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />


        </Container>

    )
}

export default Registro

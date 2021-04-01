import React, { useState } from 'react'
import {
    Box,
    makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import SinRegistro from './SinRegistro'
import Registro from './Registro'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    espacio: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    btnAlerta: {
        color: theme.palette.error.main,
    },
}))


const FamiliaAgrega = ({ setOpenPopup, personaData, notif, personasList, familia }) => {
    const classes = useStyles()
    const values = {
        familia: familia?.familia || '',
        iglesia: personaData.iglesia,
        personas: familia?.personas || []
    }
    const [form, setForm] = useState(false)


    const cancelar = () => {
        setOpenPopup(false)
    }

    return (
        <Page
            className={classes.root}
            title="Registro Familia"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
                textAlign='center'
            >
                {
                    form || Object.keys(familia).length !== 0 ?
                        <Registro
                            personaData={personaData}
                            notif={notif}
                            personasList={personasList}
                            values={values}
                            cancelar={cancelar}
                            classes={classes}
                            setOpenPopup={setOpenPopup}
                            editar={Object.keys(familia).length !== 0 ? true : false}
                        />
                        :
                        <SinRegistro
                            personaData={personaData}
                            setForm={setForm}
                            cancelar={cancelar}
                            classes={classes} />

                }

            </Box>

        </Page>
    )
}

export default FamiliaAgrega

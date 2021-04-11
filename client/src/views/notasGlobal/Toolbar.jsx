import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
    Box,
    Card,
    CardContent,
    InputAdornment,
    makeStyles,
    Grid,
    Button
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Controls from 'src/components/controls/Controls'
import SortBar from 'src/components/SortBar'
import PrintIcon from '@material-ui/icons/Print'
import GetAppIcon from '@material-ui/icons/GetApp'
import { CSVLink } from 'react-csv'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    }
}))

const menuItems = [
    { value: 'Todo', label: 'Todas' },
    { value: 'General', label: 'General' },
    { value: 'Oracion', label: 'Petición Oración' }

];

const Toolbar = ({ className, notas, handleInput, filtroChange, sortMenu, setSortMenu, setOpenPopup, ...rest }) => {
    const classes = useStyles()

    const csvData = notas.map(x => {
        let nuevo = {
            Nombre: x.persona.nombre,
            aPaterno: x.persona.aPaterno,
            aMaterno: x.persona.aMaterno,
            Nota: x.nota,
            Categoria: x.categoria,
            Fecha: moment(x.fecha).locale('es').format('L'),
            Autor: x.createdBy.nombre
        }
        return nuevo
    })



    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box mt={3} mb={1}>
                <Card>
                    <CardContent>
                        <Box >
                            <Grid
                                container
                                spacing={1}
                                justify='flex-start'
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    md={4}
                                    xs={4}
                                >
                                    <SortBar
                                        sortBy={sortMenu}
                                        menuItems={menuItems}
                                        handleSortChange={e => filtroChange(e)}
                                        label="Personas"

                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={8}
                                    xs={8}
                                >
                                    <Controls.Input
                                        fullWidth
                                        placeholder="Buscar Nota"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                        onInput={e => handleInput(e)}
                                    />
                                </Grid>


                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>


            <Grid
                container
                spacing={1}
                justify='flex-end'
                alignItems="center"
            >
                <Grid item >
                    <CSVLink data={csvData} filename={`${rest.iglesia}-notas.csv`} >
                        <Button
                            color='primary'
                            variant='outlined'
                            startIcon={<GetAppIcon />}
                        >
                            Descargar</Button>
                    </CSVLink>

                </Grid>
                <Grid item >
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<PrintIcon />}
                        onClick={() => setOpenPopup(true)}

                    >
                        imprimir</Button>
                </Grid>

            </Grid>


        </div>
    )
}

Toolbar.propTypes = {
    className: PropTypes.string
}

export default Toolbar

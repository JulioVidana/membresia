import { useState } from 'react'
import {
    InputAdornment,
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Controls from 'src/components/controls/Controls'
import SortBar from 'src/components/SortBar'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
/* import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ExpandMore from '@material-ui/icons/ExpandMore' */
import { useDispatch } from 'react-redux'
import { obtenerPersonas, obtenerInactivos } from 'src/redux/personasDucks'


/* const useStyles = makeStyles((theme) => ({
    paperBtn: {
        //width: 160,
        height: 50,
        textAlign: 'center'

    }
})) */

const menuItems = [
    { value: 'Todos', label: 'Todos' },
    { value: 'bautizado', label: 'Bautizado' },
    { value: 'Hombre', label: 'Hombre' },
    { value: 'Mujer', label: 'Mujer' },
    { value: 'miembros', label: 'Tipos de Miembros' },
    { value: 'edades', label: 'Grupo Edades' },
    { value: 'Inactivos', label: 'Inactivos' },

]

const Toolbar = (
    {
        usuariosList,
        filterFn,
        handleSearch,
        sortMenu,
        iglesia,
        setSortMenu,
        setFilterFn,
        catalogos
    }) => {
    const dispatch = useDispatch()
    const [filtroTipo, setFiltroTipo] = useState({
        activa: true,
        tipo: '',
        value: '',
        catalogo: []
    })
    /* const classes = useStyles()
    const [anchorEl2, setAnchorEl2] = useState(null)

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget)
    }
    const handleClose2 = () => {
        setAnchorEl2(null)
    } */

    const changeTipo = (event) => {
        let filtro = event.target.value

        setFiltroTipo({ ...filtroTipo, value: filtro })

        setFilterFn({
            fn: items => {
                switch (filtroTipo.tipo) {
                    case 'miembros':
                        return items.filter(x => x.tipoMiembro?.tipo.includes(filtro))
                    case 'edades':
                        return items.filter(x => x.grupoEdad?.tipo.includes(filtro))
                    default:
                        return items
                }
            }
        })
    }


    const handleSortChange = (e, value) => {
        let filtro = e.target.value

        if (filtro === 'miembros') {
            setFiltroTipo({ ...filtroTipo, activa: false, tipo: filtro, catalogo: catalogos.tipoMiembro })
        } else if (filtro === 'edades') {
            setFiltroTipo({ ...filtroTipo, activa: false, tipo: filtro, catalogo: catalogos.grupoEdades })
        } else {
            setFiltroTipo({ ...filtroTipo, activa: true })
        }

        filtro === 'Inactivos' ?
            dispatch(obtenerInactivos(iglesia))
            :
            dispatch(obtenerPersonas(iglesia))



        setSortMenu(filtro)
        setFilterFn({
            fn: items => {
                switch (filtro) {
                    case 'bautizado':
                        return items.filter(x => x.bautismo.activo === true)
                    case 'Hombre':
                    case 'Mujer':
                        return items.filter(x => x.sexo.includes(filtro))
                    default:
                        return items
                }
            }
        })

    }

    return (
        <Box p={2}>
            <Grid
                container
                spacing={1}
                justify='flex-start'
                alignItems="center"
            >
                <Grid
                    item
                    md={6}
                    sm={6}
                    xs={12}
                >
                    <Controls.Input
                        fullWidth
                        placeholder="Buscar Persona"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid
                    item
                    md={3}
                    sm={3}
                    xs={6}
                >
                    <SortBar
                        sortBy={sortMenu}
                        menuItems={menuItems}
                        handleSortChange={handleSortChange}
                        label="Personas"
                    />


                </Grid>
                <Grid
                    item
                    md={3}
                    sm={3}
                    xs={6}
                >
                    <FormControl variant="outlined" fullWidth size='medium'>
                        <InputLabel id="sort-label">Tipo {filtroTipo.tipo}</InputLabel>
                        <Select
                            labelId="sort-label"
                            label="Tipo miembros"
                            disabled={filtroTipo.activa}
                            value={filtroTipo.value}
                            onChange={changeTipo}
                            startAdornment={
                                !filtroTipo.activa &&
                                <InputAdornment position="start">
                                    <UnfoldMoreIcon
                                        color="primary"
                                        fontSize='large'
                                    />
                                </InputAdornment>
                            }
                        >
                            {filtroTipo.catalogo.map((m) => (
                                <MenuItem key={m._id} value={m.tipo}>
                                    {m.tipo}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                </Grid>
                <Grid
                    item
                    md={3}
                    xs={3}
                >
                    <Typography
                        variant="h5"
                        color="secondary"
                        component="div" >
                        {`${filterFn.fn(usuariosList).length} Personas`}
                    </Typography>

                </Grid>

                {/*  <Grid
                    item
                    lg={1}
                >

                    <Button
                        fullWidth
                        variant="outlined"
                        className={classes.paperBtn}
                        size='large'
                        color="primary"
                        startIcon={<ViewColumnIcon />}
                        onClick={handleClick2}
                    >
                        {<ExpandMore />}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}

                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>



                </Grid> */}

            </Grid>
        </Box>
    )
}

export default Toolbar

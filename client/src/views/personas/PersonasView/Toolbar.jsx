import React, { useState } from 'react'
import {
    InputAdornment,
    Box,
    Typography,
    Grid,
    Button,
    Menu,
    MenuItem,
    makeStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Controls from 'src/components/controls/Controls'
import SortBar from 'src/components/SortBar'
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    paperBtn: {
        //width: 160,
        height: 50,
        textAlign: 'center'

    }
}))

const Toolbar = (
    {
        usuariosList,
        filterFn,
        handleSearch,
        sortMenu,
        menuItems,
        handleSortChange
    }) => {
    const classes = useStyles()
    const [anchorEl2, setAnchorEl2] = useState(null)

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget)
    }
    const handleClose2 = () => {
        setAnchorEl2(null)
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
                    md={2}
                    xs={2}
                >
                    <Typography
                        variant="h5"
                        color="secondary"
                        component="div" >
                        {`${filterFn.fn(usuariosList).length} Personas`}
                    </Typography>

                </Grid>
                <Grid
                    item
                    md={6}
                    xs={6}
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
                    xs={3}
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



                </Grid>

            </Grid>
        </Box>
    )
}

export default Toolbar

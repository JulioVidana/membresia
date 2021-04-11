import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cargaPersona } from 'src/redux/personaDetalleDucks'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Avatar
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import getInitials from 'src/utils/getInitials'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}))

const PersonasRecientes = ({ className, datos, ...rest }) => {
    const classes = useStyles();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const abrirDetalle = item => {
        dispatch(cargaPersona(item))
            .then(() => {
                navigate('/app/personadetalle');
            })
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                subtitle={`${datos.length} en total`}
                title="Personas Recientes"
            />
            <List>
                {datos.map((item, i) => (
                    <ListItem
                        button
                        divider={i < datos.length - 1}
                        key={item._id}
                        onClick={() => abrirDetalle(item)}
                    >
                        <Box
                            alignItems="center"
                            display="flex"
                        >
                            <Avatar
                                className={classes.avatar}
                                src={item.imagen?.url}
                            >
                                {getInitials(item.completo)}
                            </Avatar>

                        </Box>
                        <ListItemText
                            primary={item.completo}
                            secondary={`${moment(item.createdAt).fromNow()}`}
                        />

                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                    component={NavLink}
                    to='/app/personas'
                >
                    Ver todos
          </Button>
            </Box>
        </Card>
    )
}

PersonasRecientes.propTypes = {
    className: PropTypes.string
}

export default PersonasRecientes

import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    makeStyles,
    Typography,
    Paper,
    colors,
    CardActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
    root: {},
    statsIcon: {
        marginRight: 5
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: theme.spacing(2)
    },
    texto: {
        marginLeft: 20
    },
    aviso: {
        //margin: theme.spacing(2),
        padding: theme.spacing(2),
        background: colors.red[100]
    },
    lista: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
}));

const FamilaCard = ({ familia, setOpenPopup }) => {
    const classes = useStyles()

    return (

        <Card>
            {
                /* Object.keys(datos.familia).length !== 0 ?*/
                Object.keys(familia).length !== 0 ?
                    <div>
                        <CardHeader
                            title={`Familia ${familia.familia}`}
                        />
                        <Divider />
                        <CardContent>
                            <List className={classes.lista}>
                                {
                                    familia.personas.map(item => (
                                        <ListItem key={item._id}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={item.imagen?.url}
                                                >
                                                    {getInitials(item.nombre)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${item.nombre}  ${item.aPaterno} ${item.aMaterno}`} />
                                        </ListItem>


                                    ))
                                }
                            </List>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="default"
                                fullWidth
                                variant="text"
                                size="large"
                                startIcon={<EditIcon />}
                                onClick={() => { setOpenPopup(true) }}
                            >
                                Editar
                            </Button>
                        </CardActions>
                    </div>
                    :
                    <div>
                        <CardHeader
                            title="Famila"
                        />
                        <Divider />
                        <CardContent>
                            <Paper className={classes.aviso}>
                                <Typography
                                    gutterBottom
                                    variant="h5">
                                    Aún no se ha agregado a alguna familia.
                        </Typography>
                            </Paper>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="default"
                                fullWidth
                                variant="text"
                                size="large"
                                startIcon={<AddIcon />}
                                onClick={() => { setOpenPopup(true) }}
                            >
                                Agregar
        </Button>
                        </CardActions>
                    </div>
            }




        </Card>

    );
};

FamilaCard.propTypes = {
    className: PropTypes.string
};

export default FamilaCard;

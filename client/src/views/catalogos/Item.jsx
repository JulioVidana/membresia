import { useNavigate } from 'react-router-dom'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Button,
    Typography,
    makeStyles,
    CardActions,
    colors
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { traeCatalogo } from 'src/redux/catalogosCustomDucks'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        color: '#fff',
        backgroundColor: colors.green[500],
        marginBottom: theme.spacing(2)
    }
}))

const Item = ({ idCatalogo, catalogo, icono: Icon }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const iraDetalle = tipo => {
        dispatch(traeCatalogo(tipo))
            .then(() => {
                navigate(`/app/catalogos/${tipo}`)
            })
    }

    return (
        <Card className={classes.root} >
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={classes.avatar}>
                        {Icon && (
                            <Icon />
                        )}
                    </Avatar>
                    <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                        {catalogo}
                    </Typography>
                    <Typography
                        align='center'
                        color="textSecondary"
                        variant="h6"
                    >

                    </Typography>

                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={() => iraDetalle(idCatalogo)}
                >
                    Editar
          </Button>
            </CardActions>
        </Card>
    )
}

export default Item

import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import {
    makeStyles,
    Container,
    Box,
    Grid
} from '@material-ui/core'
import Item from './Item'
import {
    FeaturedPlayList as miembroIcon,
    EmojiPeople as ministerioIcon,
    PermContactCalendar as grupoEdadIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const catalogos = [
    {
        id: 'tiposmiembros',
        catalogo: 'Tipos de Miembros',
        icon: miembroIcon
    },
    {
        id: 'grupoedades',
        catalogo: 'Grupos Edades ',
        icon: grupoEdadIcon
    },
    {
        id: 'tiposministerios',
        catalogo: 'Tipos de Ministerios ',
        icon: ministerioIcon
    }

]

const CatalogosView = () => {
    const classes = useStyles()

    return (
        <Page
            className={classes.root}
            title="Catálogos"
        >
            <Titulo title="Catálogos" btnType='no' />
            <Container maxWidth={false} >
                <Box mt={3}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {
                            catalogos.map(item => (
                                <Grid
                                    key={item.id}
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >

                                    <Item
                                        idCatalogo={item.id}
                                        catalogo={item.catalogo}
                                        className={classes.productCard}
                                        icono={item.icon}
                                    />

                                </Grid>
                            ))
                        }




                    </Grid>

                </Box>
            </Container>

        </Page>
    )
}

export default CatalogosView

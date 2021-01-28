import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import BtnMenu from './BtnMenu';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const Home = () => {
    const classes = useStyles();
    const menu = useSelector(store => store.general.menu)

    return (
        <Page
            className={classes.root}
            title="Home"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    {menu.map((item) => (
                        item.title !== 'Home' &&
                        <Grid
                            key={item.href}
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <BtnMenu link={item.href} title={item.title} icon={item.icon} />
                        </Grid>

                    ))}



                </Grid>
            </Container>
        </Page>

    )
}

export default Home

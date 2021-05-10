import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const Account = () => {
  const classes = useStyles();
  const usuario = useSelector(store => store.auth.usuario)

  return (
    <Page
      className={classes.root}
      title="Mi perfil"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile usuario={usuario} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails usuario={usuario} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Account

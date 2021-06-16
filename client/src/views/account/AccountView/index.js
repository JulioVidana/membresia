import { useState } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import DetalleImagen from 'src/components/DetalleImagen'
import ProfileDetails from './ProfileDetails'
import { useSelector } from 'react-redux'
import Popup from 'src/components/Popup'
import { addNotificacion } from 'src/redux/notifyDucks'
import Imagen from './Imagen'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const Account = () => {
  const classes = useStyles()
  const usuario = useSelector(store => store.auth.usuario)
  const [openPopupImg, setOpenPopupImg] = useState(false)

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
            <DetalleImagen
              title={usuario.nombre}
              subTitle={usuario.rol}
              setOpenPopup={setOpenPopupImg}
              imagen={usuario.imagen?.url}

            />
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

      <Popup
        title='Editar Imagen'
        openPopup={openPopupImg}
        setOpenPopup={setOpenPopupImg}
      >
        <Imagen
          imagen={usuario.imagen}
          notif={addNotificacion}
          setOpenPopup={setOpenPopupImg}
          idUsuario={usuario._id}
        />
      </Popup>

    </Page>
  )
}

export default Account

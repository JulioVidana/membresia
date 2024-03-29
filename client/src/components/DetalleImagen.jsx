import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}))

const DetalleImagen = ({ className, imagen, title, subTitle, setOpenPopup, ...rest }) => {
  const classes = useStyles()

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={imagen}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {title}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {subTitle}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => { setOpenPopup(true) }}
        >
          Subir Imagen
        </Button>
      </CardActions>
    </Card>
  )
}

DetalleImagen.propTypes = {
  className: PropTypes.string
}

export default DetalleImagen

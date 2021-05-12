import React from 'react'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  logoText: {
    color: '#fff',
    marginLeft: 10
  },
  logo: {
    width: '25%'
  },
  logo2: {
    width: '45%'
  }
}))

export const Logo2 = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          className={classes.logo2}
          alt="Logo"
          src="/static/logo2.png"
          {...props}
        />
        {/* <Typography variant="h5">IGLESIAPP</Typography> */}

      </Box>
    </div>
  )
}

const Logo = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
      >
        <img
          className={classes.logo}
          alt="Logo"
          src="/static/logo.png"
          {...props}
        />
        {/* <Typography className={classes.logoText} variant="h5">IGLESIAPP</Typography> */}

      </Box>
    </div>
  )
}

export default Logo

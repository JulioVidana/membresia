import React from 'react';
import { Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  logoText: {
    color: '#fff',
    marginLeft: 10
  }
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <img
          alt="Logo"
          src="/static/logo.svg"
          {...props}
        />
        <Typography className={classes.logoText} variant="h5">MEMBRESIA</Typography>

      </Box>
    </div>
  );
};

export default Logo;

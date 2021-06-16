import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { cargaMenuAccion } from 'src/redux/generalDucks'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Paper,
  colors
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import {
  BarChart as BarChartIcon
} from 'react-feather'
import NavItem from './NavItem'
import { Logo2 } from 'src/components/Logo'
import { navItems, botonesItems } from './menuData'
import NavCollapes from './NavCollapse'

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 280
  },
  desktopDrawer: {
    width: 280,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 44,
    height: 44,
    marginRight: theme.spacing(2),
    color: theme.palette.getContrastText(colors.deepOrange[500]),
    backgroundColor: colors.deepOrange[500]
  },
  iglesia: {
    width: '100%',
    padding: theme.spacing(2),
    background: colors.grey[100]
  }
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const iglesia = useSelector(store => store.general.iglesia)
  const auth = useSelector(store => store.auth.usuario)
  const { rol } = auth

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    dispatch(cargaMenuAccion(botonesItems))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, dispatch])


  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Hidden lgUp>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          pt={2}
        >
          <Logo2 />
        </Box>
      </Hidden>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Paper className={classes.iglesia} >
          <Box
            alignItems="center"
            display="flex"
          >
            <Avatar
              className={classes.avatar}
              src={iglesia.imagen?.url}
            >
              <HomeIcon />
            </Avatar>
            <Typography
              gutterBottom
              variant="h5">
              {iglesia?.nombre}
            </Typography>
          </Box>

        </Paper>

      </Box>
      <Divider />
      <Box p={2}>
        <List>
          <NavItem
            href='/app/dashboard'
            title='Dashboard'
            icon={BarChartIcon}
          />
        </List>

        {navItems.map((item) => (
          <div key={item._id}>
            {item.allowedRoles.includes(rol) && (

              <NavCollapes item={item} icon={item.icon} />
            )}
          </div>
        ))}
      </Box>

    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
}

export default NavBar

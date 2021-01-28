import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { cargaMenuAccion } from 'src/redux/generalDucks'
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Home as HomeIcon,
  List as ListIcon,
  Disc as DiscIcon
} from 'react-feather';
import NavItem from './NavItem';


const items = [
  {
    href: '/app/home',
    icon: DiscIcon,
    title: 'Home'
  },
  {
    href: '/app/iglesias',
    icon: HomeIcon,
    title: 'Iglesias'
  },
  {
    href: '/app/usuarios',
    icon: UserPlusIcon,
    title: 'Usuarios'
  },
  {
    href: '/app/personas',
    icon: UsersIcon,
    title: 'Personas'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: ListIcon,
    title: 'Customers'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState({
    avatar: '',
    title: 'Administrador',
    name: 'Julio V'
  });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    setMenu(items);
    dispatch(cargaMenuAccion(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, dispatch]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.title}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {menu.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>

    </Box>
  );

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
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;

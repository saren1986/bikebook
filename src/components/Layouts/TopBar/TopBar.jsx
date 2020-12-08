import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Auth } from 'aws-amplify';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import Logo from '../Logo/Logo';

const signOut = async () => {
  try {
    await Auth.signOut({ global: true });
    window.location.replace('/');
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

const useStyles = makeStyles((theme) => ({
  TopBar: {
    boxShadow: 'none',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
  },
  right: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    '& > *': {
      marginLeft: '10px',
    },
  },
}));
const TopBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const matchesMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    console.log('start logout');
    handleUserMenuClose();
    signOut();
  };

  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="user-desktop-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleUserMenuClose}
    >
      <MenuItem onClick={handleUserMenuClose}><Link to="/settings">Settings</Link></MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );
  const sectionDesktop = (
    <>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="user-desktop-menu"
        aria-haspopup="true"
        onClick={handleUserMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </>
  );
  return (
    <>
      <AppBar
        position={matchesMd ? 'static' : 'sticky'}
        classes={{
          root: classes.TopBar,
        }}
      >
        <Container className={classes.container}>
          <div className={classes.left}>
            <Logo />
          </div>
          <div className={classes.right}>
            <Toolbar>
              {matchesMd ? sectionDesktop : <MenuIcon onClick={() => setOpenDrawer(true)} />}
            </Toolbar>
          </div>
        </Container>
      </AppBar>
      {userMenu}
      {matchesMd
        ? null
        : <MobileDrawer open={openDrawer} closeHandler={() => setOpenDrawer(false)} />}
    </>
  );
};

export default TopBar;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from '../Logo/Logo';
import ConfirmDialog from '../../../UX/Dialogs/AlertDialog';
import MobileDrawer from '../MobileDrawer/MobileDrawer';

const useStyles = makeStyles((theme) => ({
  TopBar: {
    boxShadow: 'none',
  },
  MainContainer: {
    marginTop: '15px',
    [theme.breakpoints.up('md')]: {
      marginTop: '50px',
    },
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
const Layout = ({ children }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const matchesMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
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
        // aria-controls={menuId}
        aria-haspopup="true"
        // onClick={handleProfileMenuOpen}
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
      <Container className={classes.MainContainer}>
        <Grid
          container
          spacing={2}
        >
          {children}
        </Grid>
      </Container>
      {matchesMd
        ? null
        : <MobileDrawer open={openDrawer} closeHandler={() => setOpenDrawer(false)} />}
      <ConfirmDialog />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;

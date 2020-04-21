import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../Logo/Logo';
import Auth from '../Auth/Auth';
import User from '../User/User';
import ConfirmDialog from '../../../UX/Dialogs/AlertDialog';
import useStyles from './layout.style';
import MobileDrawer from '../MobileDrawer/MobileDrawer';

const Layout = ({ children }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const matchesMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <>
      <div className={classes.TopBar}>
        <Container className={classes.container}>
          <div className={classes.left}>
            <Logo />
          </div>
          <div className={classes.right}>
            {matchesMd ? <User /> : <MenuIcon onClick={() => setOpenDrawer(true)} />}
          </div>
        </Container>
      </div>
      <Container className={classes.MainContainer}>
        <Grid container spacing={2}>{children}</Grid>
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

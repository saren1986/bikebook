import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from '@material-ui/core';
import ConfirmDialog from '../../../UX/Dialogs/AlertDialog';
import useStyles from './layout.style';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.TopBar}>
        <Container>
          <div>Bikebook</div>
        </Container>
      </div>
      <Container className={classes.MainContainer}>
        <Grid container spacing={2}>{children}</Grid>
      </Container>
      <ConfirmDialog />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;

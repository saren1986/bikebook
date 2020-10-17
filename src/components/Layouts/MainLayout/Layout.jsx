import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../../../UX/Dialogs/AlertDialog';
import TopBar from '../TopBar/TopBar';

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    marginTop: '15px',
    [theme.breakpoints.up('md')]: {
      marginTop: '50px',
    },
  },
}));
const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <Container className={classes.MainContainer}>
        <Grid
          container
          spacing={2}
        >
          {children}
        </Grid>
      </Container>
      <ConfirmDialog />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;

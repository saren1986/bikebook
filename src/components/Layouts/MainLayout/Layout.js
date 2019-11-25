import React from 'react'
import classes from './Layout.module.css' 
import { Grid, Container } from '@material-ui/core';

const Layout = (props) => {
  return (
    <React.Fragment>
    <div className={classes.TopBar}>
      <Container>
          <div>Bikebook</div>
      </Container>
    </div>
    <Container className={classes.MainContainer}>
    <Grid container spacing={2} >{props.children}</Grid>
    </Container>
    </React.Fragment>
  )
}

export default Layout


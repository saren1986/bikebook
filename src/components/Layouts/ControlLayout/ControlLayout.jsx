import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Placeholder } from '../../../styled/styled';

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: '100px',
    position: 'relative',
    overflow: 'hidden',
  },
}));

const ControlLayout = ({ children }) => {
  const classes = useStyles();
  const [child1, child2, ...restChildren] = children;
  return (
    <>
      <Grid item md={3}>
        <Placeholder>
          {child1}
        </Placeholder>
      </Grid>
      <Grid item xs={12} md={9}>
        <Placeholder className={classes.content}>
          {child2}
          {restChildren}
        </Placeholder>
      </Grid>
    </>
  );
};

ControlLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default ControlLayout;

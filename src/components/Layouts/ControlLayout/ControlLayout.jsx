import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classes from './ControlLayout.module.css';

const ControlLayout = ({ children }) => {
  const [child1, child2, ...restChildren] = children;
  return (
    <>
      <Grid item md={3}>
        <div className="placeholder">
          {child1}
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <div className={`placeholder ${classes.content}`}>
          {child2}
          {restChildren}
        </div>
      </Grid>
    </>
  );
};

ControlLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ControlLayout;

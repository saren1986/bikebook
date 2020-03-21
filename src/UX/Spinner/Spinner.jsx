import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
  <div className={classes.wrapper}>
    <div className={classes.ldsEllipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
export default Spinner;

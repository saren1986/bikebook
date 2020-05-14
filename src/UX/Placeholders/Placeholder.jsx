import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../Spinner/Spinner';

const useStyles = makeStyles({
  wrapper: {
    height: 110,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
});
const Placeholder = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Spinner />
    </div>
  );
};

export default Placeholder;

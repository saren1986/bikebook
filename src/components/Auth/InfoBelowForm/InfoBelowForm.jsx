import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  authInfoWrapper: {
    width: '100%',
    margin: '30px auto',
    textAlign: 'center',
    '& .error': {
      color: 'red',
    },
    '& .info': {
      color: 'green',
    },
  },
  registerInfo: {
    textAlign: 'center',
    width: '100%',
    margin: '30px auto',
  },

}));
const InfoBelowForm = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.registerInfo}>
      {children}
    </div>
  );
};

export default InfoBelowForm;

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Img from '../../../mock/imgs/avatar2.png';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

}));


const User = () => {
  const classes = useStyles();

  return (
    <div>
      <Avatar alt="avatar" src={Img} className={classes.small} />
    </div>
  );
};

export default User;

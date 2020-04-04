import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '../Backdrop/Backdrop';
import useStyles from './drawerSmallStyle';

const DrawerSmall = ({ children, open, closeHandle }) => {
  const classes = useStyles();
  const style = open ? { transform: 'none', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' } : null;
  return (
    <>
      <div className={classes.sidebar} style={style}>
        <IconButton type="button" className={classes.close} onClick={closeHandle}>
          <Close />
        </IconButton>
        {children}
      </div>
      <Backdrop open={open} closeHandle={closeHandle} />
    </>
  );
};

DrawerSmall.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default DrawerSmall;

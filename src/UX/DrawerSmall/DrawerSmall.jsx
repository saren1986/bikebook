import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '../Backdrop/Backdrop';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '100%',
    minHeight: '200px',
    position: 'absolute',
    background: 'rgba(255, 255, 255, 1)',
    top: '0',
    right: '0',
    transform: 'translateX(110%)',
    padding: '15px',
    zIndex: theme.backdropZindex + 1,
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '15px',
  },

}));

const DrawerSmall = ({ children, open, closeHandle }) => {
  const classes = useStyles();
  const style = open ? { transform: 'none', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' } : null;
  return children ? (
    <>
      <div className={classes.sidebar} style={style}>
        <IconButton type="button" className={classes.close} onClick={closeHandle}>
          <Close />
        </IconButton>
        {children}
      </div>
      <Backdrop open={open} closeHandle={closeHandle} />
    </>
  ) : null;
};
DrawerSmall.defaultProps = {
  children: null,
};
DrawerSmall.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default DrawerSmall;

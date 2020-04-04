import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    // background: theme.backgroundColor.backdrop,
    background: (props) => props.backgroundColor,
    width: '100vw',
    height: '100vh',
    // zIndex: theme.backdropZindex,
    zIndex: (props) => props.zIndex,
    position: 'fixed',
    top: '0',
    left: '0',
  },
}));

const Backdrop = ({
  open, closeHandle, color, zIndex,
}) => {
  const classes = useStyles({ backgroundColor: color, zIndex });
  const style = open ? {
    opacity: '0.6',
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  } : {
    opacity: '0',
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    visibility: 'hidden',
  };
  return (
    <div
      tabIndex="-1"
      role="menuitem"
      className={classes.backdrop}
      onClick={closeHandle}
      onKeyPress={closeHandle}
      aria-label="backdrop"
      style={style}
    />
  );
};
Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  color: PropTypes.string,
  zIndex: PropTypes.number,
};
Backdrop.defaultProps = {
  color: '#000',
  zIndex: 999,
};

export default Backdrop;

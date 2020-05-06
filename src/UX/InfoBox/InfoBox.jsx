import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: '10px',
    minHeight: '52px',
    border: (props) => props.border,
  },
}));

const InfoBox = ({ children, type }) => {
  const style = {
    border: '2px solid',
  };
  if (type === 'normal') {
    style.border += ' transparent';
  } else if (type === 'info') {
    style.border += ' #46b386';
  } else if (type === 'error') {
    style.border += ' #d32f2f';
  }
  else if (type === 'warning') {
    style.border += ' #ab9111';
  }
  const classes = useStyles(style);
  return (
    <Typography
      variant="subtitle1"
      component="div"
      classes={{
        root: classes.root,
      }}
    >
      {children}
    </Typography>
  );
};
InfoBox.defaultProps = {
  children: null,
  type: 'normal',
};
InfoBox.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};
export default InfoBox;

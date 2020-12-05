import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '10px',
    minHeight: '52px',
    marginTop: 10,
    border: (props) => props.border,
    '& .MuiTypography-root': {
      textAlign: 'center',
    }
  },
}));

const InfoBox = ({ title, children, type }) => {
  const style = {
    border: '2px solid',
  };
  if (type === 'normal') {
    style.border += ' transparent';
  } else if (type === 'info') {
    style.border += ' #46b386';
  } else if (type === 'error') {
    style.border += ' #d32f2f';
  } else if (type === 'warning') {
    style.border += ' #ab9111';
  }
  const classes = useStyles(style);
  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle1"
        component="div"
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};
InfoBox.defaultProps = {
  children: null,
  type: 'normal',
  title: '',
};
InfoBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};
export default InfoBox;

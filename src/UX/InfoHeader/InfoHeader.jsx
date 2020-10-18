import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import MiniMenu from '../MiniMenu/MiniMenu';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    width: '60%',
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: '20%',
    textAlign: 'left',
  },
  actionsMenu: {
    width: '20%',
    textAlign: 'right',
  },
}));
const InfoHeader = ({ title, rightPlaceholder, menuItems }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.rightPlaceholder}>
        {rightPlaceholder}
      </div>
      <Typography
        variant="h2"
        component="h2"
        classes={{
          root: classes.title,
        }}
      >
        {' '}
        {title}
        {' '}

      </Typography>
      <div className={classes.actionsMenu}>
        {menuItems ? <MiniMenu items={menuItems} /> : null }
      </div>
    </div>
  );
};
InfoHeader.defaultProps = {
  rightPlaceholder: null,
  menuItems: null,
};

InfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  rightPlaceholder: PropTypes.node,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      func: PropTypes.func.isRequired,
    }).isRequired,
  ),
};
export default InfoHeader;

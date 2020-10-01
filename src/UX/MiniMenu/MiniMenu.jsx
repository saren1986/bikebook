import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    transform: 'translateX(-10px)!important',
  },
}));

const MiniMenu = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = items.map((item) => (
    <MenuItem
      key={item.name}
      onClick={() => { item.func(); handleClose(); }}
    >
      {item.name}
    </MenuItem>
  ));

  return items.length ? (
    <div>
      <IconButton aria-controls="mini-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="mini-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
      >
        {menuItems}
      </Menu>
    </div>
  ) : null;
};
MiniMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      func: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
};
export default MiniMenu;

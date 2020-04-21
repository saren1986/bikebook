import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { Link, withRouter } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';


const BikeItemLinks = ({ history }) => {
  const activeBike = useSelector((state) => state.bikes.activeBike);

  const addDistanceClickHandler = () => {
    history.push('/bike/add-distance');
  };
  return (
    activeBike ? (
      <>
        <Link to="/bike/info">
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </Link>
        <Link to="/bike/components">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Components" />
          </ListItem>
        </Link>
        <ListItem button onClick={addDistanceClickHandler}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add distance" />
        </ListItem>
      </>
    ) : null
  );
};

export default withRouter(BikeItemLinks);

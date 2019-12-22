import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import TimelineIcon from '@material-ui/icons/Timeline';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function AppMenu( { activeBike } ) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // let bikesListElements = '';

  // if(bikesList.length){
  //   bikesListElements = bikesList.map((bike, i)=>{
  //     return (
  //       <Link to={`/show-bike/${bike.id}`}>
  //         <ListItem button className={classes.nested}>
  //             <ListItemIcon/>
  //             <ListItemText primary={bike.name} />
  //         </ListItem>
  //       </Link>
  //     )
  //   });
  // }

  let menuBikeControls = null;
  if(activeBike){
    menuBikeControls = 
    <React.Fragment>
    <ListItem button >
      <ListItemIcon>
        <DirectionsBikeIcon />
      </ListItemIcon>
      <ListItemText primary={activeBike.name} />
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Info" />
        </ListItem>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Components" />
        </ListItem>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
    </List>
  </Collapse>
    </React.Fragment>;
  }else{
  //   menuBikeControls = <Link to='/add-bike'>
  //   <ListItem button >
  //     <ListItemIcon>
  //       <AddIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Add bike" />
  //   </ListItem>
  // </Link>;
  }
  return (
    
    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
    
      <Link to='/bike-list'>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {activeBike ? <ArrowBackIcon/> : <DirectionsBikeIcon /> }
        </ListItemIcon>
        <ListItemText primary="Your bikes" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItem>
      </Link>
      {menuBikeControls}
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
           {bikesListElements} 
          <Link to='/add-bike'>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add bike" />
            </ListItem>
          </Link>
        </List>
      </Collapse> */}
       
      {/* <ListItem button>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Stats" />
      </ListItem> */}
      <ListItem button >
        <ListItemIcon>
          <NotificationsNoneIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
    </List>
  );
}
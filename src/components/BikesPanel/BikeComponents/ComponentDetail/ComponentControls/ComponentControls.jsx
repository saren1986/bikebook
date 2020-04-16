import React from 'react';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Edit from '@material-ui/icons/Edit';
import useStyle from './componentControlsStyle';

const ComponentControls = ({
  openDrawer, activeAlert, alertOff, retired, retireComponent, deleteComponent,
}) => {
  const classes = useStyle();

  let alertSwitcher = null;
  if (!activeAlert) {
    alertSwitcher = (
      <Tooltip title="Set alert">
        <IconButton type="button" onClick={() => openDrawer('alert')}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    alertSwitcher = (
      <Tooltip title="Disable alert">
        <IconButton type="button" onClick={alertOff}>
          <NotificationsOffIcon />
        </IconButton>
      </Tooltip>
    );
  }
  let retireSwitcher = null;
  if (!retired) {
    retireSwitcher = (
      <Tooltip title="Retire">
        <IconButton type="button" onClick={retireComponent}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    retireSwitcher = (
      <Tooltip title="Delete">
        <IconButton type="button" onClick={deleteComponent}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
  const noRetiredButtons = retired ? null : (
    <>
      <Tooltip title="Switch bike">
        <IconButton type="button" onClick={() => openDrawer('switch')}>
          <AutorenewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton type="button">
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <>
      <div className={classes.wrapper}>
        {!retired ? null
          : (<strong className={classes.retired}>RETIRED</strong>)}
        <div className={classes.controls}>
          {retired ? null : alertSwitcher}
          {retireSwitcher}
          {noRetiredButtons}
        </div>
      </div>
    </>

  );
};

ComponentControls.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  activeAlert: PropTypes.bool.isRequired,
  alertOff: PropTypes.func.isRequired,
  retireComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  retired: PropTypes.bool.isRequired,
};

export default ComponentControls;

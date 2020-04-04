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
  openAlertDrawer, activeAlert, alertOff, retired,
}) => {
  const classes = useStyle();
  const handleClickAlert = () => {
    openAlertDrawer(true);
  };
  let alertSwitcher = null;
  if (!activeAlert) {
    alertSwitcher = (
      <Tooltip title="Set alert">
        <IconButton type="button" onClick={handleClickAlert}>
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
        <IconButton type="button">
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    retireSwitcher = (
      <Tooltip title="Delete">
        <IconButton type="button">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.controls}>
          {alertSwitcher}
          <Tooltip title="Switch bike">
            <IconButton type="button">
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
          {
            retireSwitcher
          }
          <Tooltip title="Edit">
            <IconButton type="button">
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>

  );
};

ComponentControls.propTypes = {
  openAlertDrawer: PropTypes.func.isRequired,
  activeAlert: PropTypes.bool.isRequired,
  alertOff: PropTypes.func.isRequired,
  retired: PropTypes.bool.isRequired,
};

export default ComponentControls;

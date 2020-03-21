import React from 'react'
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import classes from './ComponentControls.module.css'

const ComponentControls = () => {
  return (
    <React.Fragment>
      {/* <div className={classes.control} onClick={modalAlert}>
        <NotificationsIcon/>
      </div> */}
      <div className={classes.control}>
        <DeleteOutline/>
      </div>
      <div className={classes.control}>
        <Edit/>
      </div>
    </React.Fragment>
  )
}

export default ComponentControls

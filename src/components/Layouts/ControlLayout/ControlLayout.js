import React from 'react'
import Grid from '@material-ui/core/Grid';
import classes from './ControlLayout.module.css'

const ControlLayout = ( {children} ) => {
  const [child1, child2, ...restChildren] = children; 
  return (
    <React.Fragment>
      <Grid item md={3}>
        <div className="placeholder">
          {child1}
        </div>
      </Grid>
      <Grid item md={9} >
        <div className={"placeholder " + classes.content}>
          {child2}
          {restChildren}
        </div>
      </Grid>
   </React.Fragment>
  )
}

export default ControlLayout

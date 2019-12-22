import React, {useEffect} from 'react'
import classes from './BikeList.module.css'
import BikeTile from './BikeTile/BikeTile'
import BikeListControls from './BikeListControls/BikeListControls'
import Grid from '@material-ui/core/Grid';

const BikeList = ( { bikeList, modalOpenAddBike, setActiveBike } ) => {
  
 useEffect(()=>{
  setActiveBike(null);
 })

  const renderedBikeList = bikeList.map((bike, i)=>{
    return <BikeTile key={bike.id} bike={bike} />
  });

  return (
    <React.Fragment>
    <div className={classes.wrapper}>
      <Grid container spacing={2}>
      {renderedBikeList}
      </Grid>
    </div>
    <BikeListControls modalOpenAddBike={modalOpenAddBike}/>
    </React.Fragment>
  )
}

export default BikeList

import React from 'react';
import classes from './BikeItem.module.css';
import BikeComponents from '../BikeComponents/BikeComponents'
import { Typography } from '@material-ui/core';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const BIKE_DISPLAYED_DATA = ['distance', 'brand_name', 'model_name', 'description' ];

const BikeItem = ( { bike, addComponent } ) => {
  const bikeInfo = BIKE_DISPLAYED_DATA.map(item=>{
    if(bike[item]){
    return (
    <TableRow key={'bike_' + bike.id + "_" + item}>
      <TableCell className={classes.tableCellA}>{item.replace('_name', '')}:</TableCell>
      <TableCell className={classes.tableCellB}>{bike[item]}</TableCell>
    </TableRow>)
      }
      return null;
  });

  let bikeComponents = [];
  if(bike.hasOwnProperty('components')){
    bikeComponents = [...bike.components];
  };



  return (
    <div className={classes.wrapper}>
      <div className={classes.bikeItemHeader}>
        <Typography variant="h2" component="h2" className={classes.title}>{bike.name}</Typography>
        <div className={classes.bikeItemControls}>controlls</div>
      </div>
      <div className={classes.bikeItemContent}>
        <div className={classes.left}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {bikeInfo}
          </TableBody>
        </Table>
        </div>
        <div className={classes.right}>
          <div className={classes.imgPlaceholder}>image placeholder</div>
        </div>
        
      </div>
      <div className={classes.currentComponents}>
        {/* <div className={classes.bikeItemHeader}>
          <Typography variant="h3" component="h3" >

          </Typography>
        </div> */}
        
        <BikeComponents components={bikeComponents} addComponent={addComponent}/>
      </div>
    </div>
  )
}

export default BikeItem




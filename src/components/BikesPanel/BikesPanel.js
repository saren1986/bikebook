import React, { useState } from 'react'
import BikesNav from './Navigation/BikesNav';
import AddBike from './AddBike/AddBike'
import Content from './Content/Content'
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';

import Modal from '../../components/Modal/Modal'
import classes from './BikesPanel.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BikeList from './BikeList/BikeList';

const BIKE_TYPES = ['Road', 'MTB', 'Downhill', 'Cross', 'City'];



const BikesPanel = () => {
  // const [bikeId, setBikeID] = useState(2);
  const [bikeList, setBikeList] = useState([
    { 
    "id": "1",
    "StravaID": 'b1145059',
    "name": "KTM",
    "resource_state": 3,
    "distance": 11058280,
    "brand_name": null,
    "model_name": null,
    "frame_type": 3,
    "description": "Opis"
    },
    { 
      "id": "2",
      "StravaID": 'b1145059',
      "name": "ROWEREK",
      "resource_state": 3,
      "distance": 11058280,
      "brand_name": null,
      "model_name": null,
      "frame_type": 3,
      "description": "Opis"
      },
    { 
      "id": "3",
      "StravaID": 'b1145059',
      "name": "STRZAŁA",
      "resource_state": 3,
      "distance": 11058280,
      "brand_name": 'KTM',
      "model_name": null,
      "frame_type": 3,
      "description": "Opis"
      }
  ]);

  const [modalOpenAddBike, setModalOpenAddBike] = React.useState(false);
 

  const handleOpenAddBikeModal = () => {
    setModalOpenAddBike(true);
  };

  const handleCloseAddBikeModal = value => {
    setModalOpenAddBike(false);
  };

  const addBike =  newBikeValues => {
    const tempBikeList = [...bikeList, newBikeValues];
    setBikeList(tempBikeList);
  }

  const BikeRoute = ({ bikeList, component: Component, ...rest }) => {
  
    return (
      <Route
        {...rest}
        render={
          (routeProps )=>{
            const currentBikeId = routeProps.match.params.id;
            const bikeIndex = bikeList.findIndex(elem=>elem.id === currentBikeId);
            const matchedBike = bikeList[bikeIndex];
            console.log("habababa", routeProps.match)
          return <Component bike={matchedBike} {...routeProps }/>
        }
        }
      />
    );
  }

  return (
   
    <Router>
      <ControlLayout>   
        <BikesNav bikesList={ bikeList }/> 

          <Switch>
            <Route exact path={["/bike-list", "/"]}>
              <BikeList bikeList={ bikeList } modalOpenAddBike={handleOpenAddBikeModal}/>
            </Route>
          {/* <Route exact path="/"
          render={
              (props)=>{
                return <Content bike={bikeList[0]} {...props}/>}
            }

          /> */}
          <BikeRoute path="/show-bike/:id" component={Content} bikeList={bikeList}/>
          </Switch>
          {/* todo // modal do przeniesienia */}
      <Modal title="Add bike" open={modalOpenAddBike} handleClose={handleCloseAddBikeModal}>
        <AddBike  addBike={addBike} bikeTypes={BIKE_TYPES} />
      </Modal>
      </ControlLayout>
      </Router>
      
    
  )
}

export default BikesPanel





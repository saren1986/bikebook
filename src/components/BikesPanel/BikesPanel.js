import React, { useState } from 'react'
import BikesNav from './Navigation/BikesNav';
import AddBike from './AddBike/AddBike'
import BikeItem from './BikeItem/BikeItem'
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import AddComponent from './BikeComponents/AddComponent/AddComponent'

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
const COMPONENT_TYPES = ['Front Wheel', 'Rear Wheel', 'Fork', 'Handlebar', 'Pedals', 'Front Tire', 'Rear Tire', 'Bottom Bracket', 'Front Brake', 'Rear Brake', 'Front Brake Pads', 'Rear Brake Pads', 'Front Brake Lever', 'Rear Brake Lever', 'Cassette', 'Chain', 'Chainrings', 'Crankset', 'Front Derailleur', 'Rear Derailleur', 'Headset', 'Saddle', 'Seatpost', 'Stem', 'Front Brake Cable', 'Rear Brake Cable', 'Front Shifter Cable', 'Rear Shifter Cable', 'Shift Levers', 'Front Shock', 'Rear Shock', 'Front Brake Rotor', 'Rear Brake Rotor', 'Other'];
const COMPONENT_START_DATE = ['begining', 'today'];




const BikesPanel = () => {

  //temporary JSON
  const [bikeList, setBikeList] = useState([
    { 
    "id": "1",
    "StravaID": 'b1145059',
    "name": "KTM",
    "resource_state": 3,
    "distance": 11058280,
    "brand_name": "KTM",
    "model_name": "Strada",
    "frame_type": 3,
    "description": "Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the ",
    "components" : [
      {
        "id": "c1",
        "retired" : false,
        "type": 'chain',
        "brand": 'KMC',
        "model": 'XC10',
        "weight": 1.01,
        "startDate": '16-12-2019',
        "initialDistance": 0,
        "distance": 320,
        "distanceAlert": 300,
        "description": 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the'
      },
      {
        "id": "c2",
        "retired" : false,
        "type": 'chain',
        "brand": 'KMC',
        "model": 'XC10',
        "startDate": '16-12-2019',
        "initialDistance": 50,
        "distance": 1220,
        "distanceAlert": 12200,
        "weight": 1.01,
        "description": 'text text text'
      },
      {
        "id": "c3",
        "retired" : true,
        "type": 'chain',
        "brand": 'KMC',
        "model": 'XC10',
        "startDate": '01-12-2019',
        "initialDistance": 0,
        "distance": 990,
        "distanceAlert": 0,
        "weight": 1.01,
      },
      {
        "id": "c4",
        "type": "Front Tire",
        "brand": "schwalbe",
        "model": "ss",
        "weight": "23.3",
        "startDate": "2019-12-22",
        "initialDistance": "0",
        "description": "",
        "distanceAlert": 0,
        "distance": 0
      },
      {
        "id": "c5",
        "type": "Stem",
        "brand": "elele",
        "model": "elele",
        "weight": "33",
        "startDate": "begining",
        "initialDistance": "0",
        "description": "test",
        "distanceAlert": 0,
        "distance": 11058280
      },
      {
        "id": "c6",
        "type": "Front Brake",
        "brand": "eee",
        "model": "eee",
        "weight": "22",
        "startDate": "begining",
        "initialDistance": "100",
        "description": "",
        "distanceAlert": 0,
        "distance": 11158280
      }
    ]
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
  const [nextBikeId, setNextBikeId] = React.useState("4");
  const [nextComponentId, setNextComponentId] = React.useState("c4");
  const [modalOpenAddBike, setModalOpenAddBike] = React.useState(false);
  const [modalOpenAddComponent, setModalOpenAddComponent] = React.useState(false);
  const [activeBike, setActiveBike] = React.useState(null);
 
  const handleOpenAddBikeModal = () => {
    setModalOpenAddBike(true);
  };

  const handleCloseAddBikeModal = () => {
    setModalOpenAddBike(false);
  };
  const handleOpenAddComponentModal = () => {
    setModalOpenAddComponent(true);
  };

  const handleCloseAddComponentModal = () => {
    setModalOpenAddComponent(false);
  };

  const addBike =  newBikeValues => {
    const temp = {
      "components" : []
    }
    const tempBikeList = [...bikeList, newBikeValues];
    setBikeList(tempBikeList);
    setModalOpenAddBike(false);
  }

  const getCurrentBikeData = (id)=>{
    const bikeIndex = bikeList.findIndex(elem=>elem.id === id);
    return bikeList[bikeIndex];
  }
  const getBikeIndex = (id) =>{
    return bikeList.findIndex(elem=>elem.id === id);
  }

  const addComponent = (data) => {
    const currentBikeId = activeBike.id;
    const tempBikeList = [...bikeList];
    const bikeIndex = getBikeIndex(currentBikeId);
    let distance = 0;
    let date = "begining";
    let distanceAlert = 0;
    if(data.distanceAlert){
      distanceAlert =  data.distanceAlert * 1000;
    }

    if(data.startDate === 'begining'){
      distance = activeBike.distance + data.initialDistance * 1000;
    }else if(data.startDate === 'today'){
      distance += data.initialDistance * 1000;
      date =  new Date().toJSON().slice(0,10);
    }
    const newData = {
      ...data, 
      id: 'c111', //todo
      distance: distance,
      startDate: date,
      distanceAlert: distanceAlert,
    };
    tempBikeList[bikeIndex].components.push(newData);
    setBikeList(tempBikeList);
  }

  const BikeRoute = ({component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={
          (routeProps )=>{
            const currentBikeData = getCurrentBikeData(routeProps.match.params.id)
            setActiveBike(currentBikeData);
          return <Component bike={currentBikeData} addComponent={handleOpenAddComponentModal} {...routeProps }/>
        }
        }
      />
    );
  }
  return (
  <Router>
    <ControlLayout>   
      <BikesNav  activeBike={activeBike}/> 
        <Switch>
          <Route exact path={["/bike-list", "/"]}>
            <BikeList bikeList={ bikeList } modalOpenAddBike={handleOpenAddBikeModal} setActiveBike={setActiveBike} />
          </Route>
          <BikeRoute path="/show-bike/:id" component={BikeItem}/>
        </Switch>
      <Modal title="Add bike" open={modalOpenAddBike} handleClose={handleCloseAddBikeModal}>
        <AddBike  addBike={addBike} bikeTypes={BIKE_TYPES} />
      </Modal> 
      <Modal title="Add component" open={modalOpenAddComponent} handleClose={handleCloseAddComponentModal}>
        <AddComponent addComponent={addComponent} componentsTypes={COMPONENT_TYPES} componentStartDate={COMPONENT_START_DATE} />
      </Modal>
    </ControlLayout>
  </Router> 
  )
}

export default BikesPanel





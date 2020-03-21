import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import BikesNav from './Navigation/Navigation';
import AddBike from './AddBike/AddBike';
import BikeItem from './BikeItem/BikeItem';
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import AddComponent from './BikeComponents/AddComponent/AddComponent';
import Modal from '../Modal/Modal';
// import classes from './BikesPanel.module.css';
import BikeList from './BikeList/BikeList';
import AddDistance from './AddDistance/AddDistance';
import bikes from '../../mock/bikes';
import Spinner from '../../UX/Spinner/Spinner';
import * as bikesData from '../../mock/bikesData';
import * as convert from '../../utils/distanceFormatters';


const BikesPanel = () => {
  const [bikeList, setBikeList] = useState(null);
  // const [nextBikeId, setNextBikeId] = React.useState('4');
  // const [nextComponentId, setNextComponentId] = React.useState('c4');
  const [modalAddBike, setShowModalAddBike] = useState(false);
  const [modalAddComponent, setModalAddComponent] = useState(false);
  const [modalAddDistance, setModalAddDistance] = useState(false);
  const [activeBikeId, setActiveBikeId] = useState(null);
  const [currentBikeData, setCurrentBikeData] = useState(null);
  useEffect(() => {
    console.log('Bike Panel start', activeBikeId);
    setTimeout(() => { // simulating server delay
      setBikeList(bikes);
    }, 10);
  }, []);

  const getBikeIndex = (id) => bikeList.findIndex((elem) => elem.id === id);
  const getCurrentBikeData = (id) => {
    const bikeIndex = getBikeIndex(id);
    return bikeList[bikeIndex];
  };
  const setActiveBike = (id) => {
    setActiveBikeId(id);
    setCurrentBikeData(getCurrentBikeData(id));
  };

  const handleOpenAddBikeModal = () => {
    setShowModalAddBike(true);
  };
  const handleCloseAddBikeModal = () => {
    setShowModalAddBike(false);
  };
  const handleOpenAddComponentModal = () => {
    setModalAddComponent(true);
  };
  const handleCloseAddComponentModal = () => {
    setModalAddComponent(false);
  };
  const handleOpenAddDistanceModal = () => {
    setModalAddDistance(true);
  };
  const handleCloseAddDistanceModal = () => {
    setModalAddDistance(false);
  };
  const addBike = (data) => {
    const newBikeValues = { ...data, components: [], distance: convert.kmToMeter(data.distance) };
    const newBikeList = [...bikeList, newBikeValues];
    setBikeList(newBikeList);
    setShowModalAddBike(false);
  };

  const addComponent = (data) => {
    const newBikeList = [...bikeList];
    const bikeIndex = getBikeIndex(activeBikeId);
    const currentBike = newBikeList[bikeIndex];
    let distance = 0;
    let date = 'begining';
    let distanceAlert = 0;
    if (data.distanceAlert) {
      distanceAlert = convert.kmToMeter(data.distanceAlert);
    }
    if (data.startDate === 'begining') {
      distance = currentBike.distance + convert.kmToMeter(data.initialDistance);
    } else if (data.startDate === 'today') {
      distance += convert.kmToMeter(data.initialDistance);
      date = new Date().toJSON().slice(0, 10);
    }
    const newData = {
      ...data,
      id: 'c111', // todo
      distance,
      startDate: date,
      distanceAlert,
    };
    newBikeList[bikeIndex].components.push(newData);
    setBikeList(newBikeList);
    setModalAddComponent(false);
  };
  const updateComponentDistance = (component, newDistance) => ({
    ...component,
    distance: component.distance + newDistance,
  });
  const addDistance = (distance) => {
    const newDistance = parseFloat(distance, 10) * 1000;
    const newBikeList = [...bikeList];
    const bikeIndex = getBikeIndex(activeBikeId);
    const currentBike = newBikeList[bikeIndex];
    const components = [...currentBike.components];
    newBikeList[bikeIndex].distance += newDistance;
    newBikeList.components = components
      .map((component) => updateComponentDistance(component, newDistance));
    setBikeList(newBikeList);
    handleCloseAddDistanceModal();
  };
  const setDistanceAlert = (componentId, distance) => {
    const newDistanceAlert = parseFloat(distance, 10) * 1000;
    const tempBikeList = [...bikeList];
    const bikeIndex = getBikeIndex(activeBikeId);
    const currentBike = tempBikeList[bikeIndex];
    const componentsToUpdate = [...currentBike.components];
    const componentToUpdate = componentsToUpdate.find(((comp) => comp.id === componentId));
    componentToUpdate.distanceAlert = newDistanceAlert;
    currentBike.components = componentsToUpdate;
    setBikeList(tempBikeList);
  };
  return (
    <ControlLayout>
      <BikesNav
        activeBike={activeBikeId}
        addDistance={handleOpenAddDistanceModal}
        handleOpenAddBikeModal={handleOpenAddBikeModal}
      />
      {bikeList ? (
        <Switch>
          <Route path="/bike-list">
            <BikeList
              bikeList={bikeList}
              modalOpenAddBike={handleOpenAddBikeModal}
              setActiveBike={setActiveBike}
            />
          </Route>
          <Route path="/bike">
            <BikeItem
              bike={currentBikeData}
              addComponent={handleOpenAddComponentModal}
              setActiveBikeId={setActiveBikeId}
              setDistanceAlert={setDistanceAlert}
            />
          </Route>
          <Redirect exact from="/" to="/bike-list" />
        </Switch>
      ) : <Spinner />}
      <Modal
        title="Add bike"
        open={modalAddBike}
        handleClose={handleCloseAddBikeModal}
      >
        <AddBike
          addBike={addBike}
          bikeTypes={bikesData.BIKE_TYPES}
        />
      </Modal>
      <Modal
        title="Add component"
        open={modalAddComponent}
        handleClose={handleCloseAddComponentModal}
      >
        <AddComponent
          addComponent={addComponent}
          componentsTypes={bikesData.COMPONENT_TYPES}
          componentStartDate={bikesData.COMPONENT_START_DATE}
        />
      </Modal>
      <Modal
        title="Add distance"
        open={modalAddDistance}
        handleClose={handleCloseAddDistanceModal}
      >
        <AddDistance
          addDistance={addDistance}
        />
      </Modal>
    </ControlLayout>
  );
};
export default BikesPanel;

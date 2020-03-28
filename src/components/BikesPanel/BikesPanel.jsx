import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BikesNav from './Navigation/Navigation';
import AddBike from './AddBike/AddBike';
import BikeItem from './BikeItem/BikeItem';
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import AddComponent from './BikeComponents/AddComponent/AddComponent';
import Modal from '../Modal/Modal';
import * as actions from '../../store/actions/index';
import BikeList from './BikeList/BikeList';
import AddDistance from './AddDistance/AddDistance';
import Spinner from '../../UX/Spinner/Spinner';
import * as bikesData from '../../mock/bikesData';


const BikesPanel = () => {
  const dispatch = useDispatch();
  const bikeList = useSelector((state) => state.bikes.list);
  const [modalAddBike, setShowModalAddBike] = useState(false);
  const [modalAddComponent, setModalAddComponent] = useState(false);
  const [modalAddDistance, setModalAddDistance] = useState(false);

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
    dispatch(actions.addBike(data));
    setShowModalAddBike(false);
  };

  const addComponent = (data) => {
    dispatch(actions.addComponent(data));
    setModalAddComponent(false);
  };

  const addDistance = (distance) => {
    dispatch(actions.addDistance(distance));
    handleCloseAddDistanceModal();
  };

  return (
    <ControlLayout>
      <BikesNav
        addDistance={handleOpenAddDistanceModal}
        handleOpenAddBikeModal={handleOpenAddBikeModal}
      />
      {bikeList ? (
        <Switch>
          <Route path="/bike-list">
            <BikeList
              modalOpenAddBike={handleOpenAddBikeModal}
            />
          </Route>
          <Route path="/bike">
            <BikeItem
              addComponent={handleOpenAddComponentModal}
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

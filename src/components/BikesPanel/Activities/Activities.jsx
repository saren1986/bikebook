import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'react-router-dom';
import { Header, BtnWrapper, Btn } from '../../../styled/styled';
import ActivityTile from './ActivityTile/ActivityTile';
import { formatDistance } from '../../../utils/distanceFormatters';
import { secondsToHours } from '../../../utils/timeFormatters';
import Placeholder from '../../../UX/Placeholders/Placeholder';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { STRAVA_SYNC_URL } from '../../../CONST';


const useStyles = makeStyles({
  activitiesList: {


  },
});
const Activities = ({ history }) => {
  const classes = useStyles();
  const activities = useSelector((store) => store.activities);
  const bikes = useSelector((store) => store.bikes.list);
  const isStravaAuth = useSelector((state) => !!state.strava.auth.accessToken);

  const addNewActivityHandler = () => {
    history.push('/activities/add');
  };
  const stravaClickHandler = () => {
    if (isStravaAuth) {
      history.push('/strava');
    } else {
      window.location = STRAVA_SYNC_URL;
    }
  };
  const activitiesToRender = activities
    .sort((a, b) => b.startDate - a.startDate)
    .map((activity) => {
      const bike = bikes.find((b) => b.id === activity.bikeId);
      return (
        <LazyLoad key={activity.id} height={115} offset={-50} once placeholder={<Placeholder />}>
          <ActivityTile
            id={activity.id}
            startDate={activity.startDate}
            strava={activity.strava}
            title={activity.title}
            bike={bike ? bike.name : 'unknown'}
            time={secondsToHours(activity.movingTime)}
            distance={formatDistance(activity.distance, 'km')}
          />
        </LazyLoad>
      );
    });
  return (
    <>
      <Header>Activities</Header>
      <div className={classes.activitiesList}>
        {activitiesToRender.length ? activitiesToRender
          : (
            <InfoBox type="warning">
              You have not any activities yet.
            </InfoBox>
          )}
      </div>
      <BtnWrapper>
        {!isStravaAuth || !activitiesToRender.length ? (
          <Btn variant="outlined" color="primary" onClick={stravaClickHandler}>
            Sync with Strava
          </Btn>
        ) : null}
        <Btn variant="outlined" color="primary" onClick={addNewActivityHandler}>
          Add new activity
        </Btn>
      </BtnWrapper>
    </>
  );
};


export default withRouter(Activities);

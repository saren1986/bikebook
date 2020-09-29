import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { removeActivity, openConfirmDialog } from '../../../store/actions/index';


const useStyles = makeStyles({
  activitiesList: {


  },
});
const Activities = ({ history }) => {
  const classes = useStyles();
  const activities = useSelector((store) => store.activities);
  const components = useSelector((state) => state.components);
  const bikes = useSelector((store) => store.bikes.list);
  const isStravaAuth = useSelector((state) => !!state.strava.auth.accessToken);
  const dispatch = useDispatch();


  const addNewActivityHandler = () => {
    history.push('/activity/add');
  };
  const stravaClickHandler = () => {
    if (isStravaAuth) {
      history.push('/strava');
    } else {
      window.location = STRAVA_SYNC_URL;
    }
  };
  const editActivityHandler = (activity) => {
    history.push({
      pathname: '/activity/edit',
      activity,
    });
  };

  const deleteActivityHandler = (activity) => {
    dispatch(openConfirmDialog(
      'Delete activity', 'The activity will be deleted permanently. Are you sure?', () => {
        const bikeComponents = components
          .filter((comp) => comp.bikeId === activity.bikeId && !comp.retired
                  && new Date(comp.startDate).getTime() < new Date(activity.startDate).getTime())
          .map((comp) => comp.id);
        dispatch(removeActivity(activity, bikeComponents));
      },
    ));
  };
  const activitiesToRender = activities
    .sort((a, b) => (new Date(a.startDate) > new Date(b.startDate) ? -1 : 1))
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
            editHandler={!activity.strava ? () => editActivityHandler(activity) : null}
            deleteHandler={!activity.strava ? () => deleteActivityHandler(activity) : null}
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

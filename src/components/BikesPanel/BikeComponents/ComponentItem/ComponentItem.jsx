import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withRouter } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import SmallAlertView from '../Alert/SmallAlertView/SmallAlertView';
import { formatDistance } from '../../../../utils/distanceFormatters';
import { getNextAlert, getRequireActionAlert } from '../../../../utils/alerts';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:not(:last-of-type)': {
      borderBottom: 'none',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRadius: 0,
    },
  },
  area: {
    padding: 15,
    display: 'flex',
    flexWrap: 'wrap',
  },
  labelsSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      justifyContent: 'flex-start',
    },
  },
  distanceSection: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '20%',
      margin: 0,
    },
  },
  additionalInfo: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '15px 0',
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      width: '40%',
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
  },
  additionalInfoSub: {
    width: '100%',
    maxWidth: '170px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: 10,
    '&:not(:last-child)::after': {
      marginLeft: 10,
      content: '"|"',
    },
  },
  label2: {
    display: 'inline-block',
    paddingRight: 5,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      paddingRight: 0,
    },
  },
  mobileSee: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  retired: {
    color: '#f00',
  },
  retiredWrapper: {
    background: '#e6e3e3c4',
  },
}));
const ComponentItem = ({
  id, model, type, brand, distance, alerts, retired, history, location, lengthUnit,
}) => {

  const classes = useStyles();
  const formattedDistance = formatDistance(distance, lengthUnit);
  let alert = getRequireActionAlert(alerts);
  if (!alert) {
    alert = getNextAlert(alerts);
  }
  const clickHandler = () => {
    history.push({
      pathname: `${location.pathname}/detail`,
      state: {
        id,
      },
    });
  };
  let additionalInfo = null;
  let alertInfo = null;
  if (alert) {
    alertInfo = (
      <>
        <SmallAlertView
          alert={alert}
          lengthUnit={lengthUnit}
        />
      </>
    );
  } else {
    alertInfo = (
      <>
        <span className={classes.label2}>Alert: </span>
        <strong>no set</strong>
      </>
    );
  }
  if (retired) {
    additionalInfo = (
      <div className={classes.retired}>
        <strong className={classes.retired}>RETIRED</strong>
      </div>
    );
  }
  return (
    <Card className={retired ? [classes.root, classes.retiredWrapper].join(' ') : classes.root} variant="outlined">
      <CardActionArea
        classes={{
          root: classes.area,
        }}
        onClick={clickHandler}
      >
        <div className={classes.labelsSection}>
          {type ? (<strong className={classes.label}>{type}</strong>) : null}
          {brand ? (<strong className={classes.label}>{brand}</strong>) : null}
          {model ? (<span className={classes.label}>{model}</span>) : null}
        </div>
        <div className={classes.distanceSection}>
          <div className={classes.label2}>Distance: </div>
          <strong>{formattedDistance}</strong>
        </div>
        <div className={classes.additionalInfo}>
          <div className={classes.additionalInfoSub}>
            {retired ? additionalInfo : alertInfo}
          </div>
        </div>
        <div className={classes.mobileSee}>
          <span>Details</span>
          <ArrowForwardIcon />
        </div>
      </CardActionArea>
    </Card>
  );
};
ComponentItem.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  lengthUnit: PropTypes.string.isRequired,
  alerts: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  retired: PropTypes.bool.isRequired,
};
export default withRouter(ComponentItem);

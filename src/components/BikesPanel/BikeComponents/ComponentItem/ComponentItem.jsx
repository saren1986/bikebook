import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withRouter } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import AlertMessage from '../Alert/Message/Message';

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
    textAlign: 'left',
    margin: '20px 0 10px',
    [theme.breakpoints.up('sm')]: {
      width: '20%',
      textAlign: 'center',
      margin: 0,
    },
  },
  additionalInfo: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
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
      marginBottom: 5,
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
  }
}));
const ComponentItem = ({
  id, model, type, brand, distance, alert, retired, leftDistance, history, location,
}) => {
  const classes = useStyles();
  const clickHandler = () => {
    history.push({
      pathname: `${location.pathname}/detail`,
      state: {
        id,
      },
    });
  };
  let additionalInfo = null;
  if (retired) {
    additionalInfo = (
      <div className={classes.retired}>
        <strong className={classes.retired}>RETIRED</strong>
      </div>
    );
  } else {
    additionalInfo = (
      <>
        <div className={classes.label2}>Service alert:</div>
        {alert ? (
          <AlertMessage
            leftDistance={leftDistance}
            short
          />
        ) : (<strong>no set</strong>)}
      </>
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
          <strong>{distance}</strong>
        </div>
        <div className={classes.additionalInfo}>
          { additionalInfo }
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
  distance: PropTypes.string.isRequired,
  alert: PropTypes.bool.isRequired,
  retired: PropTypes.bool.isRequired,
  leftDistance: PropTypes.number,
};
export default withRouter(ComponentItem);

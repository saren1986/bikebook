import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { COMPONENT_TYPES } from '../../../mock/constans';
import { formatDistance, remainDistance } from '../../../utils/distanceFormatters';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import ComponentItem from './ComponentItem/ComponentItem';

const useStyles = makeStyles((theme) => ({
  componentsList: {
    marginTop: '20px',
  },
  filters: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
    marginLeft: 0,
  },
  group: {
    flexDirection: 'row',
  },
}));

const BikeComponents = ({
  components, bike, history,
}) => {
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.options.units);
  const [filterState, setFilterState] = useState({
    active: true,
    retired: false,
  });
  const handleFilterStateChange = (event) => {
    setFilterState({ ...filterState, [event.target.name]: event.target.checked });
  };

  const addNewComponentHandler = () => {
    history.push({
      pathname: '/component/add',
      bikeId: bike.id,
    });
  };
  const { active, retired } = filterState;
  const menuItems = [
    {
      name: 'Add new',
      func: addNewComponentHandler,
    },
  ];
  const renederComponents = components
    .filter((c) => {
      if (!retired && !active) {
        return false;
      }
      if (c.retired === !active) {
        return true;
      }
      if (c.retired === retired) {
        return true;
      }
      return false;
    })
    .map((c) => (
      <ComponentItem
        key={c.id}
        id={c.id}
        type={COMPONENT_TYPES.find((type) => type.id === c.type).label}
        brand={c.brand}
        model={c.model}
        distance={formatDistance(c.distance, lengthUnit)}
        retired={c.retired}
        alert={c.alert.on}
        leftDistance={c.alert.on
          ? remainDistance(c.alert.startDistance, c.distance, c.alert.endDistance) : null}
      />
    ));
  const mainRender = (
    <>
      <div className={classes.filters}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup
            classes={{
              root: classes.group,
            }}
          >
            <FormControlLabel
              control={<Checkbox checked={active} onChange={handleFilterStateChange} name="active" />}
              label="Active"
            />
            <FormControlLabel
              control={<Checkbox checked={retired} onChange={handleFilterStateChange} name="retired" />}
              label="Retired"
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.componentsList}>
        {renederComponents}
      </div>
    </>
  );
  return (
    <>
      <InfoHeader
        title={`${bike.name}'s components`}
        menuItems={menuItems}
      />
      {components.length
        ? mainRender
        : (
          <InfoBox
            type="warning"
            title={`${bike.name} does not have any components yet.`}
          >
            <Button color="primary" onClick={addNewComponentHandler}>
              Add new
            </Button>
          </InfoBox>
        )}

    </>
  );
};

BikeComponents.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(BikeComponents);

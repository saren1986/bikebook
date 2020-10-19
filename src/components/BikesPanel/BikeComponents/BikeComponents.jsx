import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ComponentItem from './ComponentItem/ComponentItem';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import { formatDistance, remainDistance } from '../../../utils/distanceFormatters';
import { COMPONENT_TYPES } from '../../../mock/constans';
import { withRouter } from 'react-router-dom';
import InfoBox from '../../../UX/InfoBox/InfoBox';

const useStyles = makeStyles((theme) => ({
  componentsList: {
    marginTop: '20px',
  },
}));

const BikeComponents = ({
  components, bike, history, location,
}) => {
  console.log('components', components);
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.options.units);
  // const getActiveComponents = (compArr, active) => compArr.filter((c) => c.retired !== active);
  // const formatComponentsData = (compArr) => compArr.map((c) => ({
  //   ...c,
  //   distanceFormatted: formatDistance(c.distance, lengthUnit),
  //   startDate: c.startDate,
  //   alert: c.alert.on ? (
  //     <AlertMessage
  //       remainDistance={remainDistance(c.alert.startDistance, c.distance, c.alert.endDistance)}
  //       lengthUnit={lengthUnit}
  //       short
  //     />
  //   ) : 'no set',
  //   type: COMPONENT_TYPES.find((type) => type.id === c.type).label,
  // }));

  const menuItems = [
    {
      name: 'Add new',
      func: () => {
        history.push({
          pathname: '/component/add',
          bikeId: bike.id,
        });
      },
    },
  ];
  const renederComponents = components.map((c) => (
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

  return (
    <>
      <InfoHeader
        title={`${bike.name}'s components`}
        menuItems={menuItems}
      />
      <div className={classes.componentsList} >
        {renederComponents.length
          ? renederComponents
          : (
            <InfoBox type="warning">
              {`${bike.name} does not have any components yet`}
            </InfoBox>
          )}
      </div>
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

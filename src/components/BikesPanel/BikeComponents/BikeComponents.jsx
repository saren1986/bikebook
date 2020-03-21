import React, { forwardRef, useState } from 'react';

import MaterialTable from 'material-table';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { meterToKm, format } from '../../../utils/distanceFormatters';
import classes from './BikeComponents.module.css';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const BikeComponents = ({ components, addComponent, history, match, location }) => {
  const getActiveComponents = (components, active) => components.filter((comp) => comp.retired !== active);
  const formatDistanceComponents = (components) => components.map((comp) => ({
    ...comp,
    distanceFormatted: format(meterToKm(comp.distance), 'KM'),
  }));
  const activeComponents = getActiveComponents(components, true);
  const activeComponentsTable = activeComponents.length ? {
    columns: [
      { field: 'type', title: 'Type' },
      { field: 'brand', title: 'Brand' },
      { field: 'distanceFormatted', title: 'Distance' },
      { field: 'startDate', title: 'On bike since' },
      { field: 'alert', title: 'alert' },
    ],
    data: formatDistanceComponents(activeComponents),
  } : null;
  const retiredComponents = getActiveComponents(components, false);
  const retiredComponentsTable = retiredComponents.length ? {
    columns: [
      { field: 'type', title: 'Type' },
      { field: 'brand', title: 'Brand' },
      { field: 'distanceFormatted', title: 'Distance' },
      { field: 'startDate', title: 'On bike since' },
      { field: 'retiredDate', title: 'Retired on' },
    ],
    data: formatDistanceComponents(retiredComponents),
  } : null;
  const onRowClick = (event, rowData) => {
    console.log(match, location)
    history.push(`${location.pathname}/${rowData.id}`);
  };
  return (
    <>
      {activeComponents.length ? (
        <MaterialTable
          isFreeAction="true"
          title="Active components"
          icons={tableIcons}
          onRowClick={onRowClick}
          options={
          {
            search: false,
            paging: false,
            maxBodyHeight: 500,
            actionsColumnIndex: -1,
          }
        }
          columns={activeComponentsTable.columns}
          data={activeComponentsTable.data}
          actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: 'Add Component',
              isFreeAction: true,
              onClick: addComponent,
            },
          ]
        }
        />
      ) : null}
      {retiredComponents.length ? (
        <MaterialTable
          title="Retired components"
          icons={tableIcons}
          onRowClick={onRowClick}
          options={
          {
            search: false,
            paging: false,
            maxBodyHeight: 500,
          }
        }
          columns={retiredComponentsTable.columns}
          data={retiredComponentsTable.data}
        />
      ) : null}
    </>
  );
};

BikeComponents.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(BikeComponents);

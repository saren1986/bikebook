import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
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
import useStyles from './bikeComponents.style';
// import { useSelector } from 'react-redux';
import { formatDistance } from '../../../utils/distanceFormatters';
import { COMPONENT_TYPES } from '../../../mock/constans';

const tableIcons = {
  // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  // ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function TabPanel(props) {
  const {
    children, value, index,
  } = props;
  const classes = useStyles();
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box className={classes.tabPanel} p={0}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const BikeComponents = ({
  components, history, location,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { lengthUnit } = useSelector((state) => state.user.units);
  const getActiveComponents = (compArr, active) => compArr.filter((c) => c.retired !== active);
  const formatComponentsData = (compArr) => compArr.map((c) => ({
    ...c,
    distanceFormatted: formatDistance(c.distance, lengthUnit),
    startDate: c.startDate === '1' ? 'begining' : c.startDate,
    alert: c.alert.on ? 'on' : 'off',
    type: COMPONENT_TYPES.find((type) => type.id === c.type).label.eng,
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
    data: formatComponentsData(activeComponents),
  } : {};
  const retiredComponents = getActiveComponents(components, false);
  console.log(retiredComponents);
  const retiredComponentsTable = retiredComponents.length ? {
    columns: [
      { field: 'type', title: 'Type' },
      { field: 'brand', title: 'Brand' },
      { field: 'distanceFormatted', title: 'Distance' },
      { field: 'startDate', title: 'On bike since' },
      // { field: 'retiredDate', title: 'Retired on' },
    ],
    data: formatComponentsData(retiredComponents),
  } : null;
  const onRowClick = (event, rowData) => {
    history.push({
      pathname: `${location.pathname}/detail`,
      state: {
        id: rowData.id,
      },
    });
  };
  return (
    <>
      <AppBar
      // color="secondary"
        position="static"
        classes={{
          root: classes.tabBar,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Bike components tab"
          indicatorColor="primary"

        >
          <Tab
            label="Active"
            id="tab1"
            aria-controls="tab1"
            classes={{
              selected: classes.tabSelected,
              root: classes.tab,
            }}
          />
          {retiredComponents.length ? (
            <Tab
              label="Retired"
              id="tab2"
              aria-controls="tab2"
              classes={{
                selected: classes.tabSelected,
                root: classes.tab,
              }}
            />
          ) : null}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>


        <MaterialTable
          isFreeAction="true"
          style={{ borderRadius: 'none' }}
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
        />
      </TabPanel>
      {retiredComponents.length ? (
        <TabPanel value={value} index={1}>
          <MaterialTable
            title="Retired components"
            icons={tableIcons}
            onRowClick={onRowClick}
            className={classes.table}
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
        </TabPanel>
      ) : null}
    </>
  );
};

BikeComponents.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(BikeComponents);

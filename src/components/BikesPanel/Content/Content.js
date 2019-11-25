import React from 'react';
import style from './Content.module.css';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        background: "#fff",
        color: '#333',
      },
      indicator: {
        backgroundColor:'red',
        zIndex: '1',
      },
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <div className={style.tabPanel}>{children}</div>
    </Typography>
  );
}
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const ShowBike = ( { bike, match } ) => {

  const [value, setValue] = React.useState(0);


  // const bike = bikeList[bikeIndex];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className={style.root} >
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
        >
          <LinkTab label="Info" href="/bike-info" {...a11yProps(0)} />
          <LinkTab label="Components" href="/bike-components" {...a11yProps(1)} />
          <LinkTab label="History" href="/bike-history" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
          <div className={style.nameLabel}>
            <span>{bike.name}</span>
          </div> 
          <ul className={style.info}>
          <li>Distance: {bike.distance}</li>
          <li>Brand: {bike.brand_name}</li>
          <li>Model: {bike.model_name}</li>
          <li>Description: {bike.description}</li>
          </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Components
      </TabPanel>
      <TabPanel value={value} index={2}>
        History
      </TabPanel>
    
    </div>
    </ThemeProvider>
  )
}

export default ShowBike




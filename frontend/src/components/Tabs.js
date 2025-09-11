import * as React from "react";
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect } from "react";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, 
            color: '#EDE4F1', 
            fontFamily: 'Audiowide, sans-serif', 
            fontSize: '1.3rem', 
            lineHeight: 1.6, overflowY:'auto', maxHeight:'50vh', overflowWrap:'break-word' }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const TabsComponent = ({ tabValues, defaultTab = "0" }) => {
  const [value, setValue] = React.useState(defaultTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setValue(defaultTab);
  }, [defaultTab]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{borderBottom: " 2px solid #EDE4F1"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#61E4C5",
            },
            "& .MuiTab-root": {
              color: "#EDE4F1",
              fontFamily: "Audiowide, sans-serif",
              fontSize: "24px",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#61E4C5 !important",
            },
          }}
        >
          {tabValues ? tabValues.map((tabValue, index) => <Tab className="cursor-target" value={index} label={tabValue.heading} />) : ""}
          {/* <Tab value="one" label="Summary" />
        <Tab value="two" label="Friends" /> */}
        </Tabs>
      </Box>
      {tabValues ? tabValues.map((tabValue,index) =>       
        <CustomTabPanel value={value} index={index}>
            {tabValue.value}
        </CustomTabPanel>)
        : ""} 

    </Box>
  );
};

export default TabsComponent;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";


function AnalyticsTracker() {
  const location = useLocation(); // Gets current location

  useEffect(() => {
    // Send a pageview event to google analytics every time the route changes
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
    
  }, [location]); // This effect runs every time 'location' changes

  return null; // This component doesn't render anything
}

export default AnalyticsTracker;
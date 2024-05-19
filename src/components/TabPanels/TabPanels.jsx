import React from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ViewUserProfileInfo from "../NavigationTabs/ViewUserProfileInfo";
import EditUserProfileInfo from "../NavigationTabs/EditUserProfileInfo";
import AppointmentHistory from "../AppointmentHistory/AppointmentHistory";
import FavoriteLocations from "../FavoriteLocations/FavoriteLocations";
import Notifications from "../Notifications/Notifications";
import SettingsSection from "../SettingsSection/SettingsSection";

function CustomTabPanel(props) {
  const { children, value, index } = props;
  const location = useLocation();
  const { userID } = useParams();

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        padding:
          location.pathname === `/profile/${userID}/history` ||
          location.pathname === `/profile/${userID}/favorite`
            ? 0
            : "22px 17px",
        backgroundColor:
          location.pathname === `/profile/${userID}/history` ||
          location.pathname === `/profile/${userID}/favorite`
            ? "#fff"
            : "#E8F2EE",
      }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

// Validate data types for props passed to CustomTabPanel component
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string,
  value: PropTypes.string,
};

function TabPanels(props) {
  const {
    value,
    routes,
    recentAppointments,
    pastAppointments,
    favoriteLocations,
    profile
  } = props;

  const location = useLocation();
  const { userID } = useParams();

  return (
    <Box
      sx={{
        marginTop: { xs: "30px", sm: 0 },
        width: { sm: "100%" },
      }}
    >
      <CustomTabPanel value={value} index={routes[0]}>
        {location.pathname === `/profile/${userID}` && <ViewUserProfileInfo profile={profile} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={routes[1]}>
        {location.pathname === `/profile/${userID}/edit` && <EditUserProfileInfo profile={profile} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={routes[2]}>
        {location.pathname === `/profile/${userID}/history` && (
          <AppointmentHistory
            recentAppointments={recentAppointments}
            pastAppointments={pastAppointments}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={routes[3]}>
        {location.pathname === `/profile/${userID}/favorite` && (
          <FavoriteLocations favoriteLocations={favoriteLocations} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={routes[4]}>
        {location.pathname === `/profile/${userID}/notifications` && <Notifications />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={routes[5]}>
        <SettingsSection />
      </CustomTabPanel>

      {/* <CustomTabPanel value={value} index={routes[6]}></CustomTabPanel> */}
    </Box>
  );
}

export default TabPanels;

import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AvatarProfile from "../../components/AvatarProfile/AvatarProfile";
import NavigationTabs from "../../components/NavigationTabs/NavigationTabs";
import TabPanels from "../../components/TabPanels/TabPanels";
import fakeFavoriteLocations from "../../fakeAPI/fakeFavoriteLocations.json";
import fakeRecentAppointments from "../../fakeAPI/fakeRecentAppointments.json";
import fakePastAppointments from "../../fakeAPI/fakePastAppointments.json";
import httpRequest from "../../utils/httpRequests";

function UserProfilePage() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.replace(/\/+$/, ""));
  const { userID } = useParams();
  const [profile, setProfile] = React.useState(null);

  // These 3 states can be used to test rendering of appointments & favorite locations
  const [recentAppointments, setRecentAppointments] = useState(
    fakeRecentAppointments
  );
  const [pastAppointments, setPastAppointments] =
    useState(fakePastAppointments);
  const [favoriteLocations, setFavoriteLocations] = useState(
    fakeFavoriteLocations
  );

  const routes = [
    `/profile/${userID}`,
    `/profile/${userID}/edit`,
    `/profile/${userID}/history`,
    `/profile/${userID}/favorite`,
    `/profile/${userID}/notifications`,
    `/profile/${userID}/settings`,
    `/profile/${userID}/logout`,
  ];

  React.useEffect(() => {
    httpRequest.get(`customer/id/${userID}`)
      .then(response => setProfile(response.data))
      .then(() => console.log(profile))
      .catch(error => console.error(error));
  }, [userID, profile]);

  console.log(profile);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (location.pathname === `/profile/${userID}/edit`) {
      setValue(`/profile/${userID}/edit`);
    } else if (location.pathname === `/profile/${userID}`) {
      setValue(`/profile/${userID}`);
    }
  }, [location.pathname, userID]);

  return (
    <UserProfileContainer>
      <Box>
        <AvatarProfile />
        <NavigationTabs
          value={value}
          routes={routes}
          handleChange={handleChange}
        />
      </Box>
      <TabPanels
        value={value}
        routes={routes}
        recentAppointments={recentAppointments}
        pastAppointments={pastAppointments}
        favoriteLocations={favoriteLocations}
        profile={profile}
      />
    </UserProfileContainer>
  );
}

const UserProfileContainer = styled(Box)(({ theme }) => ({
  marginTop: "142px",
  flexGrow: 1,
  padding: "0 14px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    gap: "30px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 40px",
    gap: "50px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 82px",
    gap: "70px",
  },
}));

export default UserProfilePage;

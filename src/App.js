import { Box, styled } from "@mui/material";
import React, { useCallback, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ResultPage from "./pages/ResultPage/ResultPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import SuccessfulBookingRequest from "./pages/SuccessfulBookingRequest/SuccessfulBookingRequest";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import EditUserProfileInfo from "./components/NavigationTabs/EditUserProfileInfo";
import RemoveTrailingSlash from "./components/RemoveTrailingSlash/RemoveTrailingSlash";
import AppointmentHistory from "./components/AppointmentHistory/AppointmentHistory";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/RegisterForm/LoginForm";
import DashboardLayout from "./pages/ManagerDashboard/DashboardLayout";
import DashboardMainContent from "./pages/ManagerDashboard/DashboardMainContent";
import httpRequest from "./utils/httpRequests";
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  // setupMirage();

  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleOpenRegister = () => setRegisterOpen(true);
  const handleCloseRegister = () => setRegisterOpen(false);

  const handleOpenSignIn = () => setSignInOpen(true);
  const handleCloseSignIn = () => setSignInOpen(false);

  const handleSignIn = useCallback(
    (userData) => {
      setSignedIn(true);
      setUser(userData);
      localStorage.setItem("userID", userData.id);
      if (userData.role === "manager") {
        navigate(`/manager/${userData.id}`);
      }
    },
    [navigate]
  );

  //Handle keep signed in status
  React.useEffect(() => {
    // Check if user is signed in
    httpRequest
      .get("/authen/refresh")
      .then((response) => {
        if (response.status === 200) {
          handleSignIn(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [handleSignIn]);

  //Check signin status
  React.useEffect(() => {
    console.log("signedIn:", signedIn);
  }, [signedIn]);

  //Handle Sign Out
  httpRequest.defaults.withCredentials = true;
  const handleSignOut = async () => {
    try {
      const response = await httpRequest.post("/authen/logout");
      if (response.status === 200) {
        setSignedIn(false);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      {location.pathname !== "/success" && (
        <>
          <NavBar
            signedIn={signedIn}
            user={user}
            onOpenRegister={handleOpenRegister}
            onOpenSignIn={handleOpenSignIn}
            onLogout={handleSignOut}
          />
          <RegisterForm
            open={registerOpen}
            onClose={handleCloseRegister}
            onOpenSignIn={handleOpenSignIn}
          />
          <LoginForm
            open={signInOpen}
            onClose={handleCloseSignIn}
            onSignIn={handleSignIn}
          />
        </>
      )}
      {/* RemveTrailingSlash removes the slash at the end of a URL path */}
      {/* Thus, users enter either with or without that slash will end up the same location */}
      <RemoveTrailingSlash />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shops/:searchStr" element={<ResultPage />} />
        <Route path="/shop/:id" element={<ShopPage />} />
        <Route
          path="/booking/:shopID"
          element={
            <BookingPage
              signedIn={signedIn}
              user={user}
              onOpenRegister={handleOpenRegister}
              onOpenSignIn={handleOpenSignIn}
            />
          }
        />
        <Route path="/success" element={<SuccessfulBookingRequest />} />
        <Route path="/profile/:userID/" element={<UserProfilePage />}>
          {/* Testing other tabs in UserProfilePage */}
          <Route path="edit" element={<EditUserProfileInfo />} />
          <Route path="history" element={<AppointmentHistory />} />
          <Route path="favorite" element={<EditUserProfileInfo />} />
          <Route path="notifications" element={<EditUserProfileInfo />} />
          <Route path="settings" element={<EditUserProfileInfo />} />
          <Route path="logout" element={<EditUserProfileInfo />} />
        </Route>

        {/* Manager Dashboard */}
        <Route path="/manager/:managerID" element={<DashboardLayout />}>
          <Route index element={<DashboardMainContent />} />
        </Route>
      </Routes>
      {location.pathname !== "/success" &&
        !location.pathname.includes("/profile") &&
        !location.pathname.includes("/manager/:managerID") && <Footer />}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  margin: "auto",
  padding: "0",
  overflow: "hidden",
}));

export default App;

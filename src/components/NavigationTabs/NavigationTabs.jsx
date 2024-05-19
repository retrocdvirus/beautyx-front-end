import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function extraProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    value: index,
  };
}

export default function NavigationTabs({ routes, handleChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const { userID } = useParams(); 

  return (
    <>
      <CustomTabs
        value={location.pathname !== "/" ? location.pathname : false}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
      >
        <Tab
          label="Profile"
          {...extraProps(
            location.pathname ===  `/profile/${userID}/edit` ? `/profile/${userID}/edit` : routes[0]
          )}
          onClick={() => navigate(routes[0])}
        />
        <Tab
          label="Appointment History"
          {...extraProps(routes[2])}
          onClick={() => navigate(routes[2])}
        />
        <Tab
          label="Favorite Locations"
          {...extraProps(routes[3])}
          onClick={() => navigate(routes[3])}
        />
        <Tab
          label="Notifications"
          {...extraProps(routes[4])}
          onClick={() => navigate(routes[4])}
        />
        <Tab
          label="Settings"
          {...extraProps(routes[5])}
          onClick={() => navigate(routes[5])}
        />
        <Tab
          label="Logout"
          {...extraProps(routes[6])}
          onClick={() => {
            navigate(routes[6]);
            setLogout(true);
          }}
        />
      </CustomTabs>
      <Dialog
        open={logout}
        onClose={() => setLogout(false)}
        sx={{
          height: "100vh",
          "& .MuiPaper-root": {
            margin: 0,
            borderRadius: "20px",
            width: {
              xs: "320px",
              sm: "400px",
              md: "440px",
            },
            height: "auto",
            boxShadow: "none",
          },
          "& .MuiDialogContent-root": {
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "30px",
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              textAlign: "center",
              padding: 0,
              marginBottom: "30px",
            }}
          >
            Are you sure you want to log out?
          </DialogTitle>

          {/* Register button */}
          <DialogActions
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Button
              onClick={() => setLogout(false)}
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#E7E7E7",
                  boxShadow: "none",
                },
                width: "100%",
                border: "none",
                color: "#9E9E9E",
                backgroundColor: "#E7E7E7",
                fontSize: "22px",
                boxShadow: "none",
                paddingY: "4px",
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              No
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#65A98C",
                  boxShadow: "none",
                },
                width: "100%",
                border: "none",
                color: "#fff",
                backgroundColor: "#65A98C",
                fontSize: "22px",
                boxShadow: "none",
                paddingY: "4px",
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

const CustomTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 28,

  "& .MuiTab-root": {
    minWidth: "max-content",
    fontSize: 20,
    fontWeight: "600",
    color: "#cacaca",
    textTransform: "none",
    padding: 0,
    "&.Mui-selected": {
      color: "#175C4C",
    },
  },
  "& .MuiTabs-flexContainer": {
    gap: "26px",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      gap: 0,
      flexDirection: "column",
      alignItems: "flex-start",

      "& .MuiTab-root": {
        textAlign: "left",
        fontSize: 22,
      },
    },
  },
}));

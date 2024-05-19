import React from "react";
import { Box, Typography, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

function Notifications() {
  return (
    <NotificationList>
      <NotificationContainer>
        <NotificationText>
          <Typography className="noti-heading">
            Appointment Reminder via SMS
          </Typography>
          <Typography className="noti-description">
            You will be notified of your appointments via text messages
          </Typography>
        </NotificationText>
        <NotificationSwitch />
      </NotificationContainer>
      <NotificationContainer>
        <NotificationText>
          <Typography className="noti-heading">
            Appointment Reminder via Email
          </Typography>
          <Typography className="noti-description">
            You will be notified of your appointments via registered email
          </Typography>
        </NotificationText>
        <NotificationSwitch />
      </NotificationContainer>
      <NotificationContainer>
        <NotificationText>
          <Typography className="noti-heading">
            Promotional Marketing via SMS
          </Typography>
          <Typography className="noti-description">
            You will receive discounts, offers, coupons, and news via text
            messages
          </Typography>
        </NotificationText>
        <NotificationSwitch />
      </NotificationContainer>
      <NotificationContainer>
        <NotificationText>
          <Typography className="noti-heading">
            Promotional Marketing via Email
          </Typography>
          <Typography className="noti-description">
            You will receive discounts, offers, coupons, and news via registered
            email
          </Typography>
        </NotificationText>
        <NotificationSwitch />
      </NotificationContainer>
    </NotificationList>
  );
}

const NotificationList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.up("sm")]: {
    padding: 10,
  },
  [theme.breakpoints.up("lg")]: {
    padding: 30,
  },
}));

const NotificationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "28px",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-between",
  },
}));

const NotificationText = styled(Box)(({ theme }) => ({
  "& .noti-heading": {
    fontWeight: 700,
    fontSize: "18px",
  },
  "& .noti-description": {
    fontSize: "14px",
  },
  [theme.breakpoints.up("sm")]: {
    "& .noti-heading": {
      fontSize: "20px",
    },
    "& .noti-description": {
      fontSize: "16px",
    },
  },
}));

const NotificationSwitch = styled(Switch)(({ theme }) => ({
  // Styles of Switch's container
  width: "46px",
  height: "26px",
  padding: 0,

  // Styles of its direct child
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    "&.Mui-checked": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#3E68FF",
        opacity: 1,
        border: 0,
      },
    },
  },

  // Circle button
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
  },

  // The field for the circle button
  "& .MuiSwitch-track": {
    borderRadius: "20px",
  },
}));

export default Notifications;

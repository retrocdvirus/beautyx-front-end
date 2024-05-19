import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppointmentCard from "./AppointmentCard";
// import PastAppointmentCard from "./PastAppointmentCard";

function AppointmentHistory(props) {
  const { recentAppointments, pastAppointments } = props;
  // console.log(9, recentAppointments);
  // console.log(10, pastAppointments);

  return (
    <>
      {recentAppointments.length !== 0 ? (
        <>
          <CustomHeading>Recent Appointments</CustomHeading>

          <CustomAppointmentCardContainer>
            {recentAppointments.map((recentAppointment, index) => (
              <AppointmentCard key={index} appointment={recentAppointment} />
            ))}
          </CustomAppointmentCardContainer>
        </>
      ) : (
        ""
      )}

      {pastAppointments.length !== 0 ? (
        <>
          <CustomHeading sx={{ marginTop: "42px" }}>
            Past Appointments
          </CustomHeading>

          <CustomAppointmentCardContainer>
            {pastAppointments.map((pastAppointment, index) => (
              <AppointmentCard key={index} appointment={pastAppointment} />
            ))}
          </CustomAppointmentCardContainer>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export const CustomAppointmentCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5px",
  },
  [theme.breakpoints.up("md")]: {
    gap: "8px",
  },
}));

const CustomHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "30px",
  fontWeight: 700,
  marginBottom: "10px",
}));

export default AppointmentHistory;

import { Box, Button, Divider, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

function StylistTimeCart({
  handleComplete,
  selectedEmployees,
  appointmentDate,
  appointmentStartTime,
  appointmentEndTime,
}) {
  //Handle the confirmation of next stage, trans to the children component (StylistTimeCart)
  const handleConfirmSelection = () => {
    localStorage.setItem(
      "selectedEmployees",
      JSON.stringify(selectedEmployees)
    );
    localStorage.setItem("appointmentDate", appointmentDate);
    localStorage.setItem(
      "appointmentStartTime",
      appointmentStartTime
    );
    localStorage.setItem(
      "appointmentEndTime",
      appointmentEndTime
    );
    handleComplete();
    console.log(selectedEmployees);
  };

  return (
    <React.Fragment>
      <ServicesCartWrapper>
        <ServicesLists>
          {/* Service Info */}
          <Typography sx={{textTransform: "capitalize"}}>
            Stylists: {selectedEmployees.map((employee) => employee.firstname).join(", ")}
          </Typography>
          <Typography>Date: {dayjs(appointmentDate).format('MM/DD/YYYY')}</Typography>
          <Typography>
            Start Time: {appointmentStartTime}
          </Typography>
          <Typography>
            End Time: {appointmentEndTime}
          </Typography>
        </ServicesLists>

        {/* Divider */}
        <Divider variant="middle" sx={{ my: 3 }} />

        <ProceedButton variant="contained" onClick={() => handleConfirmSelection()}>
          {" "}
          Proceed{" "}
        </ProceedButton>
      </ServicesCartWrapper>
    </React.Fragment>
  );
}

const ServicesCartWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const ServicesLists = styled(Box)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  maxHeight: "200px",
  overflow: "auto",
}));

const ProceedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontSize: "1rem",
  width: "100%",
  height: "50px",
}));

export default StylistTimeCart;

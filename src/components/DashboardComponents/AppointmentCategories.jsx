import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

function AppointmentCategories() {
  return (
    <CustomStyleAppointmentCategories>
      <Typography>No. </Typography>
      <Typography>Customers</Typography>
      <Typography>Date</Typography>
      <Typography>Time</Typography>
      <Typography>Stylist</Typography>
      <Typography>Status</Typography>
      <Typography>Actions</Typography>
    </CustomStyleAppointmentCategories>
  );
}

const CustomStyleAppointmentCategories = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  padding: "10px 24px",
  backgroundColor: "#E7E7E7",
  color: "#9E9E9E",
  "& .MuiTypography-root": {
    width: "14%",
    textAlign: "center",
  },
}));

export default AppointmentCategories;

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
// import ServiceItem from "../ServiceItems/ServiceItem";
import dayjs from "dayjs";
import httpRequest from "../../utils/httpRequests";
import { useNavigate } from "react-router-dom";

function BookingReceipt({signedIn, user}) {
  const navigate = useNavigate();
  //Handle the cart info in local storage
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  //Calculate the total time and price
  const totalPrice = cart.reduce((total, service) => total + service.price, 0);

  const totalTime = cart.reduce(
    (total, service) =>
      total +
      parseInt(service.duration.split(":")[0]) * 60 +
      parseInt(service.duration.split(":")[1]),
    0
  );

  //Get all Item in Local Storage
  const selectedEmployees = JSON.parse(
    localStorage.getItem("selectedEmployees") || "[]"
  );
  const appointmentDate = localStorage.getItem("appointmentDate");

  const appointmentStartTime = localStorage.getItem("appointmentStartTime");
  const appointmentEndTime = localStorage.getItem("appointmentEndTime");
  const salonName = localStorage.getItem("salonName");
  const salonAddress = localStorage.getItem("salonAddress");
  const userID = localStorage.getItem("userID");
  const salonID = localStorage.getItem("salonID");

  console.log(selectedEmployees)
  
  const postAppointment = async () => {
    // Make body appointment data request
    const appointmentData = {
      appointmentDate: appointmentDate,
      startTime: appointmentStartTime,
      estimatedEndTime: appointmentEndTime,
      services: cart.map(service => service.id)
    };

    try {
      const response = await httpRequest.post(
        `http://localhost:3000/appointment/create/salon/id/${salonID}/employee/id/${selectedEmployees[0].id}/customer/id/${userID}`,
        appointmentData
      );
      if (response.status === 201) {
        navigate('/success');
      } else {
        console.log('An error occurred while creating the appointment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <ReceiptWrapper>
        <ReceiptTitle sx={{ py: 3 }}> Booking Information </ReceiptTitle>
        <Box sx={{ mx: 6, py: 2, textAlign: "justify" }}>
          <Typography variant="h6" sx={{textTransform: "capitalize"}}> {salonName} </Typography>
          <Typography variant="h6">
            Date: {dayjs(appointmentDate).format("DD-MM-YYYY")}
          </Typography>

          <Typography variant="h6">
            Time:{" "}
            {`${appointmentStartTime.substring(
              0,
              5
            )} - ${appointmentEndTime.substring(0, 5)}`}
          </Typography>

          <Typography variant="h6" sx={{textTransform: "capitalize"}}>Address: {salonAddress}</Typography>

          <Typography variant="h6" sx={{textTransform: "capitalize"}}>
            Stylist:{" "}
            {selectedEmployees
              .map((employee) => `${employee.firstname} ${employee.lastname}`)
              .join(", ")}
          </Typography>

          <Typography variant="h6"> Service: </Typography>
          <List>
            {cart.map((service) => (
              <ListItem key={service.id} disableGutters>
                <ListItemText sx={{textTransform: "capitalize"}}
                  primary={service.serviceName}
                  secondary={`${service.price} • ${service.duration} • ${service.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <ServicesLists sx={{ mx: 6 }}></ServicesLists>

        {/* Divider */}
        <Divider variant="middle" sx={{ my: 3 }} />

        {/* Price and Time */}
        <PriceTimeInfomation>
          <PriceWrapper sx={{ mx: 6 }}>
            <Typography fontWeight="bold"> Total </Typography>
            <Typography> {totalPrice} VND </Typography>
          </PriceWrapper>

          <TimeWrapper sx={{ mx: 6 }}>
            <Typography fontWeight="bold"> Approximate </Typography>
            <Typography> {totalTime} minutes </Typography>
          </TimeWrapper>
        </PriceTimeInfomation>

        <Box sx={{ mx: 6 }}>
          <ProceedButton variant="contained"  disabled={!signedIn} onClick={postAppointment}>
            Proceed
          </ProceedButton>
        </Box>
      </ReceiptWrapper>
    </React.Fragment>
  );
}

const ReceiptWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "0.625rem",
  background: theme.palette.background.default,
  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.25)",
}));

const ReceiptTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "2.6rem",
  color: "#000",
  fontWeight: theme.typography.Bold,
}));

const ServicesLists = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const PriceTimeInfomation = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const PriceWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const TimeWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ProceedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  fontSize: "1rem",
  width: "100%",
  height: "50px",
}));

export default BookingReceipt;

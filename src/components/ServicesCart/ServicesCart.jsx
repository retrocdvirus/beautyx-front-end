import { Box, Button, Divider, Typography, styled } from "@mui/material";
import React from "react";
import ServiceItem from "../ServiceItems/ServiceItem";

function ServicesCart({handleComplete, removeCart, cart}) {

  //Function to calculate the total price, and approximate time when the user choose it
  //Total price
  const totalPrice = cart.reduce((total, service) => total + service.price, 0);

  //Total approximate time
  const totalTime = cart.reduce(
    (total, service) =>
      total +
      parseInt(service.duration.split(":")[0]) * 60 +
      parseInt(service.duration.split(":")[1]),
    0
  );

  return (
    <React.Fragment>
      <ServicesCartWrapper>
        <ServicesLists>
        {/* Service Info */}
        <ServiceItem removeCart={removeCart} cart={cart}/>

        </ServicesLists>

        {/* Divider */}
        <Divider variant="middle" sx={{ my: 3 }}/>

        <PriceTimeInfomation>
        <PriceWrapper>
        <Typography fontWeight="bold"> Total </Typography>
        <Typography> {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Typography>
        </PriceWrapper>

        <TimeWrapper>
        <Typography fontWeight="bold"> Approximate </Typography>
        <Typography> {totalTime} minutes </Typography>
        </TimeWrapper>
        </PriceTimeInfomation>

        <ProceedButton variant="contained" onClick={() => handleComplete()}> Proceed </ProceedButton>
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
  marginBottom: theme.spacing(2),
  fontSize: "1rem",
  width: "100%",
  height: "50px",
}));
export default ServicesCart;

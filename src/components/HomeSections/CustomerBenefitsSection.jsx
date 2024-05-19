import { Avatar, Box, Typography, styled } from "@mui/material";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SearchIcon from "@mui/icons-material/Search";

function CustomerBenefitsSection() {
  return (
    <Box>
      <BenefitsTitle>Benefits for Customers</BenefitsTitle>
      <BenefitsRow>
        <Benefit>
          <IconAvatar>
            <AttachMoneyIcon sx={{ fontSize: "3rem" }} />
          </IconAvatar>
          <Typography className="benefit-heading">Transparent Price</Typography>
          <Typography className="benefit-description">
            The prices of services are transparent so that you don’t have to be
            afraid of frauds.
          </Typography>
        </Benefit>

        <Benefit>
          <IconAvatar>
            <EventAvailableIcon sx={{ fontSize: "3rem" }} />
          </IconAvatar>
          <Typography className="benefit-heading">
            Booking Flexibility
          </Typography>
          <Typography className="benefit-description">
            Tailor your booking appointment requests with multiple services and
            preferable stylists
          </Typography>
        </Benefit>

        <Benefit>
          <IconAvatar>
            <SearchIcon sx={{ fontSize: "3rem" }} />
          </IconAvatar>
          <Typography className="benefit-heading">Convenient Search</Typography>
          <Typography className="benefit-description">
            Search for one of our partner salons or spas at different locations
            within Vietnam
          </Typography>
        </Benefit>
      </BenefitsRow>
    </Box>
  );
}

const BenefitsTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "26px",
  color: "#000",
  fontWeight: theme.typography.Bold,
  marginBottom: "14px",
  [theme.breakpoints.up("sm")]: {
    marginBottom: "18px",
    fontSize: "32px",
  },
}));

const BenefitsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "36px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  [theme.breakpoints.up("md")]: {
    gap: "20px",
  },
  [theme.breakpoints.up("lg")]: {
    gap: "30px",
  },
}));

const Benefit = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  "& .MuiTypography-root": {
    color: "#000",
  },
  "& .benefit-heading": {
    fontSize: "24px",
    fontWeight: 700,
  },
  "& .benefit-description": {
    fontSize: "20px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "46%",
    "& .benefit-heading": {
      fontSize: "26px",
    },
    "& .benefit-description": {
      fontSize: "22px",
    },
  },
  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  margin: "0 auto",
  height: "50px",
  width: "50px",
  color: "#FFF",
  backgroundColor: theme.palette.secondary.main,
  "& svg": {
    height: "36px",
    width: "36px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "60px",
    width: "60px",
    "& svg": {
      height: "44px",
      width: "44px",
    },
  },
  [theme.breakpoints.up("md")]: {
    height: "64px",
    width: "64px",
    "& svg": {
      height: "48px",
      width: "48px",
    },
  },
}));

export default CustomerBenefitsSection;

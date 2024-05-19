import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useNavigate } from "react-router-dom";

export default function SuccessfulBookingRequest() {
  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = React.useState(false);
  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    setTimeout(() => {
      setShowCountdown(true);
      const timer = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <Container
      maxWidth="100%"
      sx={{
        height: "100vh",
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <SuccessfulCheckIcon />
        <SuccessfulHeading>Booking Request Successful</SuccessfulHeading>
        <SuccessfulDescription>
          Your booking request has been sent. <br />
          Please wait for the approval.
        </SuccessfulDescription>
        {showCountdown && <SuccessfulDescription> Navigate to your homepage in {countdown} seconds</SuccessfulDescription>}
      </Box>
    </Container>
  );
}

const SuccessfulCheckIcon = styled(CheckCircleRoundedIcon)(({ theme }) => ({
  width: 90,
  height: 90,
  color: theme.palette.primary.main,
  [theme.breakpoints.up("sm")]: {
    width: 120,
    height: 120,
  },
  [theme.breakpoints.up("md")]: {
    width: 160,
    height: 160,
  },
  [theme.breakpoints.up("lg")]: {
    width: 180,
    height: 180,
  },
}));

const SuccessfulHeading = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  textAlign: "center",
  fontWeight: theme.typography.Bold,
  [theme.breakpoints.up("sm")]: {
    fontSize: 30,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 40,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 50,
  },
}));

const SuccessfulDescription = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#8A8A8F",
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {
    fontSize: 22,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 30,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 38,
  },
}));

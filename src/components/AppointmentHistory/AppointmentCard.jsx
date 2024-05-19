import React, { useState } from "react";
import { Box, Typography, Card, CardActions, Chip } from "@mui/material";
import SalonImage from "../../assets/images/salon1.jpg";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Image from "mui-image";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

function AppointmentCard({ appointment }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <CustomAppointmentCard appointment={appointment}>
      <CustomImgAppointmentContainer appointment={appointment}>
        <Image
          alt={appointment.name}
          src={SalonImage}
          duration={0}
          easing="unset"
        />

        <FavoriteOutlinedIcon
          onClick={() => {
            !favorite ? setFavorite(true) : setFavorite(false);
          }}
          sx={{
            position: "absolute",
            top: "12px",
            right: "10px",
            fontSize: 32,
            color: favorite ? "#175C4C" : "#fff",
            stroke: "#175C4C",
            strokeWidth: "2px",
            cursor: "pointer",
          }}
        />
      </CustomImgAppointmentContainer>

      <CustomAppointmentContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: appointment.status.includes("Recently Booked")
              ? "20px"
              : "26px",
          }}
        >
          <Typography
            color="secondary.main"
            sx={{
              lineHeight: "100%",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "18px" },
            }}
          >
            {appointment.status.includes("Recently Booked")
              ? appointment.name
              : appointment.name}
          </Typography>
          <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
            {appointment.status.includes("Recently Booked")
              ? appointment.date
              : appointment.date}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              {appointment.status.includes("Recently Booked")
                ? `${appointment.cost} VND`
                : `${appointment.cost} VND`}
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              {appointment.status.includes("Recently Booked")
                ? `${appointment.services} items`
                : `${appointment.services} items`}
            </Typography>
          </Box>
          {appointment.status.includes("Recently Booked") ? (
            <Chip
              variant="outlined"
              label="Recently Booked"
              sx={{
                color: "secondary.main",
                border: "1px solid #175C4C",
                backgroundColor: "primary.ComponentBackground",
                width: { xs: "128px", sm: "140px" },
                height: "22px",
                borderRadius: "8px",
                padding: { sm: "0 10px" },
                fontSize: { xs: "12px", sm: "14px" },
                "& .MuiChip-label": {
                  padding: 0,
                },
              }}
            />
          ) : (
            ""
          )}
        </Box>
        <CardActions sx={{ padding: 0, margin: 0 }}>
          {appointment.status.includes("Recently Booked") ? (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                  View Details
                </Typography>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ marginLeft: "14px", color: "#ff5151", fontWeight: 600 }}
                >
                  Cancel
                </Typography>
              </Link>
            </>
          ) : (
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "#65a98c", fontWeight: 600 }}>
                Book Again
              </Typography>
            </Link>
          )}
        </CardActions>
      </CustomAppointmentContent>
    </CustomAppointmentCard>
  );
}

const CustomAppointmentCard = styled(Card)(({ theme, appointment }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: appointment.status.includes("Recently Booked") ? "156px" : "142px",
  width: "100%",
  borderRadius: "10px",
  boxShadow: "none",
  border: "1px solid #D3D3D3",
  [theme.breakpoints.up("sm")]: {
    display: "block",
    width: "248px",
    height: "100%",
    gap: 0,
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    width: "260px",
  },
}));

const CustomImgAppointmentContainer = styled(Card)(
  ({ theme, appointment }) => ({
    position: "relative",
    boxShadow: "none",
    borderRadius: "10px 0 0 10px",
    width: appointment.status.includes("Recently Booked") ? "164px" : "150px",
    height: appointment.status.includes("Recently Booked") ? "156px" : "142px",
    [theme.breakpoints.up("sm")]: {
      borderRadius: "10px 10px 0 0",
      width: "248px",
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "260px",
    },
  })
);

const CustomAppointmentContent = styled(Box)(({ theme }) => ({
  "& .MuiTypography-root": {
    lineHeight: "100%",
  },

  [theme.breakpoints.up("sm")]: {
    padding: "12px 16px",
  },
}));

export default AppointmentCard;

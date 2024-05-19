import React, { useState } from "react";
import { Box, Typography, Card, Chip } from "@mui/material";
import SalonImage from "../../assets/images/salon1.jpg";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Image from "mui-image";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";

function FavoriteLocationCard({ favoriteLocation }) {
  const [isFavorite, setIsFavorite] = useState(true);
  // const navigate = useNavigate();

  return (
    <CustomFavoriteCard
    // onClick={() => navigate("/shop")}
    >
      <CustomImgFavoriteContainer>
        <Image
          alt={favoriteLocation.name}
          src={SalonImage}
          duration={0}
          easing="unset"
        />

        <FavoriteOutlinedIcon
          onClick={() => {
            !isFavorite ? setIsFavorite(true) : setIsFavorite(false);
          }}
          sx={{
            position: "absolute",
            top: "12px",
            right: "10px",
            fontSize: 32,
            color: isFavorite ? "#175C4C" : "#fff",
            stroke: "#175C4C",
            strokeWidth: "2px",
            cursor: "pointer",
          }}
        />
      </CustomImgFavoriteContainer>

      <CustomFavoriteContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            color="secondary.main"
            sx={{ lineHeight: "100%", fontWeight: 700 }}
          >
            {favoriteLocation.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "38px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              {favoriteLocation.stars} <StarIcon sx={{ color: "yellow" }} />
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              {favoriteLocation.reviews > 0
                ? `${favoriteLocation.reviews} reviews`
                : ""}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "14px" }}>
            {`District ${favoriteLocation.district}, ${favoriteLocation.city}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "4px",
              flexWrap: { sm: "wrap" },
              marginTop: "14px",
            }}
          >
            {favoriteLocation.status.map((status, index) => (
              <CustomChip
                key={index}
                variant="outlined"
                label={status}
                status={status}
              />
            ))}
          </Box>
        </Box>
      </CustomFavoriteContent>
    </CustomFavoriteCard>
  );
}

const CustomFavoriteCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: "142px",
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

const CustomImgFavoriteContainer = styled(Card)(({ theme }) => ({
  position: "relative",
  boxShadow: "none",
  borderRadius: "10px 0 0 10px",
  width: "150px",
  height: "142px",
  [theme.breakpoints.up("sm")]: {
    borderRadius: "10px 10px 0 0",
    width: "248px",
    height: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "260px",
  },
}));

const CustomFavoriteContent = styled(Box)(({ theme }) => ({
  "& .MuiTypography-root": {
    lineHeight: "100%",
  },

  [theme.breakpoints.up("sm")]: {
    padding: "12px 16px",
  },
}));

const CustomChip = styled(Chip)(({ theme, status }) => ({
  color: theme.palette.secondary.main,
  border: "1px solid #175C4C",
  backgroundColor: theme.palette.primary.ComponentBackground,
  width: status === "Favorite" ? "72px" : "122px",
  height: "22px",
  borderRadius: "8px",
  fontSize: "12px",
  "& .MuiChip-label": {
    padding: 0,
  },
  [theme.breakpoints.up("sm")]: {
    width: status === "Favorite" ? "80px" : "150px",
    padding: "0 10px",
    fontSize: "14px",
  },
}));

export default FavoriteLocationCard;

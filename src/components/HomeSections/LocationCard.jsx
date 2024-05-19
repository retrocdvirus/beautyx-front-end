import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

function LocationCard({ spaShop, image }) {
  return (
    <CardActionArea
      component={Link}
      // to={`/shop/${spaShop.id}`}
      sx={{ display: "inline-block", height: "100%" }}
    >
      <CustomStyleCardMedia
        component="img"
        src={image}
        alt={spaShop.salonName}
      />
      <CustomStyleCardContent>
        <Typography className="location-name">{spaShop.salonName}</Typography>
        <Box className="location-assessment">
          <Box className="location-rating">
            <Typography>
              {spaShop.salonRating
                ? Number(spaShop.salonRating).toFixed(1)
                : "N/A"}
            </Typography>
            <StarIcon className="rating-icon" />
          </Box>
          <Typography className="location-reviews">{spaShop.reviewsNumber} Reviews</Typography>
        </Box>
        <Typography className="location-address">
          {spaShop.salonAddress}
        </Typography>
      </CustomStyleCardContent>
    </CardActionArea>
  );
}

const CustomStyleCardMedia = styled(CardMedia)(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px 8px 0 0",
  [theme.breakpoints.up("md")]: {
    height: "130px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "140px",
  },
}));

const CustomStyleCardContent = styled(CardContent)(({ theme }) => ({
  padding: "6px 10px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "& .MuiTypography-root": {
    lineHeight: "100%",
    fontSize: "14px",
  },
  "& .location-name": {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textAlign: "left",
    textTransform: "capitalize",
  },
  "& .location-assessment": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
  },
  "& .location-rating": {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    "& .rating-icon": {
      width: "20px",
      height: "20px",
      color: "#F8F03C",
    },
  },
  "& .location-reviews": {
    textTransform: "capitalize",
  },
  "& .location-address": {
    textAlign: "left",
    textTransform: "capitalize",
    color: "#000",
    lineHeight: 1.3,
  },
  [theme.breakpoints.up("sm")]: {
    padding: "10px 16px",
    gap: "10px",
    "& .MuiTypography-root": {
      fontSize: "16px",
    },
    "& .location-name": {
      fontSize: "18px",
    },
    "& .location-rating": {
      "& .rating-icon": {
        width: "26px",
        height: "26px",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    gap: "14px",
    "& .location-rating": {
      "& .rating-icon": {
        width: "30px",
        height: "30px",
      },
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .location-rating": {
      "& .rating-icon": {
        width: "34px",
        height: "34px",
      },
    },
  },
}));

export default LocationCard;

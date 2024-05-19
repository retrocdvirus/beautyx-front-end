import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

function SpaInfoBox({ shop }) {
  //Set state for average total review stars (temporary)
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const salonID = localStorage.getItem("salonID");

  const handleNavBooking = () => {
    setLoading(true);
    localStorage.setItem("salonName", shop.salonName);
    localStorage.setItem("salonAddress", shop.salonAddress);
    nav(`/booking/${salonID}`);
    setLoading(false);
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <ShopPageTop>
          <SpaName variant="h5" sx={{textTransform: "capitalize"}}>{shop.salonName}</SpaName>
          <DescriptColumn>
            {/* Totol Reviews and Average Reviews */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography variant="h6" color="text.secondary" fontSize="15px">
              {shop.salonRating}
              </Typography>
              <Rating name="review-only" value={shop.salonRating} precision={0.5} readOnly />
              <Typography variant="h6" color="text.secondary" fontSize="15px">
              {shop.reviewsNumber} Reviews
              </Typography>
            </Box>
          </DescriptColumn>
        </ShopPageTop>

        {/* Display shop highlights (benefits) */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          {" "}
          Highlights{" "}
        </Typography>
        <Box sx={{}}>
          <List dense>
            {shop.highLights.map((hightlight, index) => (
              <ListItem key={index} disableGutters disablePadding>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText sx={{textTransform: "capitalize"}} key={index} primary={hightlight} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth onClick={handleNavBooking}>
        {loading ? <CircularProgress size={22} /> : "Reserve Your Spot"}
        </Button>
      </CardActions>
    </Card>
  );
}

const ShopPageTop = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const SpaName = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.Bold,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const DescriptColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export default SpaInfoBox;

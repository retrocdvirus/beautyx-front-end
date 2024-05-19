import styled from "@emotion/styled";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Button,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ShopBox({ spaShop, image }) {

  //Set state for average total review stars (temporary)
  const nav = useNavigate();

  const handleClick = () => {
    localStorage.setItem("salonID", spaShop.id);
    nav(`/shop/${spaShop.id}`)
  }

  // //Test Image:
  // React.useEffect(() => {
  //   const getImage = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/salon/pictures/d9k5wdn-b845a31c-69e5-4237-a134-0fd79e1bc991_1691670365408.jpg', { responseType: 'blob' });
  //       const imageUrl = URL.createObjectURL(response.data);
  //       setImage(imageUrl)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getImage();
  // }, []);
  
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea component={Button} onClick={handleClick}>
          <ShopImg
            component="img"
            height="200"
            src={image}
            alt={spaShop.salonName}
            sx={{objectFit: "cover"}}
          />
          <CardContent>
            <SpaTitle gutterBottom variant="h5" component="div">
              {spaShop.salonName}
            </SpaTitle>
            <ReviewRow>
            <Typography variant="body2" color="text.secondary" > {spaShop.salonRating}  </Typography>
            <Rating name="review-only" value={spaShop.salonRating} readOnly size="large"/>
            <Typography variant="body2" color="text.secondary">
              {spaShop.reviewsNumber} Reviews
            </Typography>
            </ReviewRow>
            <Typography variant="body2" color="text.secondary">
              {spaShop.salonAddress}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

const ShopImg = styled(CardMedia)(({ theme }) => ({
  // width: "140px"
}));

const SpaTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.Bold,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const ReviewRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export default ShopBox;

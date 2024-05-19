import { Box, Divider, Grid, Rating, Stack, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import httpRequest from "../../utils/httpRequests";

function ReviewLists({shop}) {
  //Set state for average total review stars (temporary)
  const [avgStars, setAvgStars] = useState(4);

  //Set state for each total stars (for only display how many stars) of reviews type
  const [totalStars, settotalStars] = useState(5);

  //Set state for review and id params
  const [reviews, setReviews] = useState(null);
  const { id } = useParams();

  if(shop.reviews.length === 0){
    return <Typography variant="h5"> There is no rating review for this shop right now </Typography>
  }
  //Display
  return (
    <React.Fragment>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ md: 12 }}>
        {/* Section: For display total numbers of reviews and type of reviews */}
        <Grid item xs={2} sm={4} md={12}>
          {/* Display all the total reviews - nested grid */}
          <Grid container columns={{ md: 12 }}>
            {/* Reviews Total */}
            <Grid item md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h5"> {shop.salonRating} </Typography>
                <Rating name="review-only" value={shop.salonRating} readOnly />
              </Box>
              <Typography variant="h6"> {shop.reviewsNumber} Reviews </Typography>
            </Grid>

            {/* Seperated each type of reviews */}
            <Grid item md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  //   flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h5"> 300 </Typography>
                <Rating
                  name="review-only"
                  value={totalStars}
                  readOnly
                  max={5}
                />
                <Divider />
                <Typography variant="h5"> 20 </Typography>
                <Rating
                  name="review-only"
                  value={totalStars}
                  readOnly
                  max={4}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  //   flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h5"> 30 </Typography>
                <Rating
                  name="review-only"
                  value={totalStars}
                  readOnly
                  max={3}
                />
                <Divider />
                <Typography variant="h5"> 30 </Typography>
                <Rating
                  name="review-only"
                  value={totalStars}
                  readOnly
                  max={2}
                />
                <Divider />
                <Typography variant="h5"> 10 </Typography>
                <Rating
                  name="review-only"
                  value={totalStars}
                  readOnly
                  max={1}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        </Grid>

      
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ md: 12 }}>
        {/* Section: Display the Reviews Lists */}

        {shop.reviews.map((review) => (
          <Grid key={review.id} item xs={2} sm={4} md={6}>
          {/* Display review lists by using nested grid, represents multiple reviews item under card form  */}
              <ReviewCard key={review.id} review={review}/>
        </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default ReviewLists;

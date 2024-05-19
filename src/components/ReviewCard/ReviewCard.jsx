import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

function ReviewCard({review}) {
  return (
    <React.Fragment>
      <Box sx={{ minWidth: "200px", pt: 1, pb: 1}}>
        <Card variant="outlined">
          <CardContent>
          <Rating name="read-only" value={review.rating} readOnly />
            <Typography variant="body1" sx={{my: 3, textTransform: "capitalize"}} component="div" color="text.secondary">
            {review.comment}
            </Typography>

            <Typography variant="h6" sx={{mt: 3, textTransform: "capitalize"}} component="div" color="text.secondary">
            {review.customer.firstname} {review.customer.lastname}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
};



export default ReviewCard;

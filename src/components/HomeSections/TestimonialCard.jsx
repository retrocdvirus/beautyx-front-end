import { Box, CardContent, Typography, Rating } from "@mui/material";
import styled from "@emotion/styled";

function TestimonialCard({ testimonial }) {
  return (
    <CustomStyleTestimonialCardContent>
      <Box className="testimonial-rating">
        <Typography>
          {testimonial.averageRating
            ? Number(testimonial.averageRating).toFixed(1)
            : "N/A"}
        </Typography>
        <Rating
          name="review-only"
          value={Number(testimonial.averageRating)}
          readOnly
          precision={0.5}
        />
      </Box>
      <Typography className="testimonial-review">
        {testimonial.review}
      </Typography>
      <Typography className="testimonial-customer">
        {testimonial.customer}
      </Typography>
    </CustomStyleTestimonialCardContent>
  );
}

const CustomStyleTestimonialCardContent = styled(CardContent)(({ theme }) => ({
  padding: "12px",
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  "&.MuiCardContent-root:last-child": {
    paddingBottom: "12px",
  },
  "& .MuiTypography-root": {
    lineHeight: "100%",
    fontSize: "16px",
    color: "#000",
    textAlign: "left",
  },
  "& .MuiRating-root": {
    "& svg": {
      width: "28px",
      height: "28px",
    },
  },
  "& .testimonial-rating": {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "& .MuiTypography-root": {
      fontSize: "18px",
    },
    "& .MuiRating-root": {
      color: "#F8F03C",
    },
  },
  "& .testimonial-review": {
    lineHeight: 1.5,
  },
  "& .testimonial-customer": {
    fontWeight: 600,
    marginTop: "16px",
    fontSize: "18px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "16px",
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "16px",
    },
  },
  [theme.breakpoints.up("md")]: {
    padding: "20px",
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "20px",
    },
  },
}));

export default TestimonialCard;

import { useState } from "react";
import { Tabs, Tab, Card, Box, Typography, styled } from "@mui/material";
import TestimonialCard from "./TestimonialCard";

function extraPropsForTestimonials(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    value: index,
  };
}

const testimonials = [
  {
    customer: "Khoa Bui",
    review: "Ok experience. Easy to navigate to what I want in the website.",
    averageRating: 4.0,
  },
  {
    customer: "Thuan Khang",
    review: "Friendly stylists. Affordable Price. Definitely come back soon!",
    averageRating: 4.5,
  },
  {
    customer: "Dane Lush",
    review: "Clean salon. Comfortable atmosphere. Quite promising.",
    averageRating: 4.3,
  },
  {
    customer: "Louis Jeans",
    review: "Clean place. Smells good. High quality products.",
    averageRating: 4.5,
  },
];

function TestimonialsSection() {
  const [testimonialValue, setTestimonialValue] = useState(0);

  const handleChangeTestimonials = (event, newValue) => {
    setTestimonialValue(newValue);
  };

  return (
    <TestimonialsContainer>
      <TestimonialsHeading>What our customers say about us</TestimonialsHeading>
      <TestimonialCardsWrapper
        value={testimonialValue}
        onChange={handleChangeTestimonials}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="visible arrows tabs example"
      >
        {testimonials.map((testimonial, i) => (
          <Tab
            component={Card}
            key={i}
            label={<TestimonialCard testimonial={testimonial} />}
            {...extraPropsForTestimonials(i)}
          />
        ))}
      </TestimonialCardsWrapper>
    </TestimonialsContainer>
  );
}

const TestimonialsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8F2EE",
  padding: "60px 0",
  [theme.breakpoints.up("sm")]: {
    padding: "82px 0",
  }
}));

const TestimonialCardsWrapper = styled(Tabs)(({ theme }) => ({
  width: "100%",
  "& .MuiTabs-flexContainer": {
    display: "flex",
    alignItems: "stretch",
    gap: "6px",
    "& .MuiCard-root": {
      width: "100%",
      height: "100%",
      padding: 0,
      borderRadius: "18px",
      boxShadow: "none",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
    },
  },
  "& .MuiTabScrollButton-root": {
    width: "20px",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      gap: "12px",
    },
    "& .MuiTabScrollButton-root": {
      width: "30px",
      "& svg": {
        fontSize: "2.6rem",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiTabs-flexContainer": {
      gap: "18px",
    },
    "& .MuiTabScrollButton-root": {
      width: "40px",
      "& svg": {
        fontSize: "3rem",
      },
    },
  },
}));

const TestimonialsHeading = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  textAlign: "center",
  color: "#000",
  fontWeight: theme.typography.Bold,
  marginBottom: "14px",
  [theme.breakpoints.up("sm")]: {
    marginBottom: "18px",
    fontSize: "32px",
  },
}));

export default TestimonialsSection;

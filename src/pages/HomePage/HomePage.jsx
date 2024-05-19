import React from "react";
import styled from "@emotion/styled";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Container, Grid } from "@mui/material";
import CustomerBenefitsSection from "../../components/HomeSections/CustomerBenefitsSection";
import TheTeamSection from "../../components/HomeSections/TheTeamSection";
import RecommendedLocations from "../../components/HomeSections/RecommendedLocations";
import TestimonialsSection from "../../components/HomeSections/TestimonialsSection";

function HomePage() {
  return (
    <HomeLayout maxWidth = "false">
      <Grid
        container
        rowSpacing={{ xs: "70px", sm: "80px", md: "90px", lg: "120px" }}
      >
        <Grid item xs={12}>
          <SearchBar />
        </Grid>

        <Grid item xs={12}>
          <RecommendedLocations />
        </Grid>

        <Grid item xs={12}>
          <CustomerBenefitsSection />
        </Grid>

        <Grid item xs={12}>
          <TestimonialsSection />
        </Grid>

        <Grid item md={12}>
          <TheTeamSection />
        </Grid>
      </Grid>
    </HomeLayout>
  );
}

const HomeLayout = styled(Container)(({ theme }) => ({
  padding: "0 14px",
  marginTop: "72px",
  backgroundColor: theme.palette.background.default,
  maxWidth: "1700px",
  // minWidth: "100%",
  // maxHeight: "100%",
  // minHeight: "80vh",
  [theme.breakpoints.up("sm")]: {
    padding: "0 40px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 60px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 82px",
  },
}));

export default HomePage;

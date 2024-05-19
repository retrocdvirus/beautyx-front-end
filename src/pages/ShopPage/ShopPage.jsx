import React, { useEffect, useState } from "react";
import ImageList from "../../components/ImageCarousel/ImageList";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SpaInfoBox from "../../components/SpaInfoBox/SpaInfoBox";
import ReviewLists from "../../components/ReviewLists/ReviewLists";
import { useParams } from "react-router-dom";
import httpRequest from "../../utils/httpRequests";

function ShopPage() {
  //Set state for average total review stars (temporary)
  const [avgStars, setAvgStars] = useState(4.8);

  //Handle shop detail state and id params
  const [shop, setShop] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getShop = async () => {
      try {
        const response = await httpRequest.get(`salon/id/${id}`);
        setShop(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getShop();
  }, [id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  if (shop) {
    console.log(shop);
  }

  return (
    <React.Fragment>
      <ShopPageWrapper maxWidth="false" sx={{ maxWidth: "1500px" }}>
        <Grid container rowSpacing={4} columnSpacing={1} columns={{ md: 12 }}>
          {/* Visual of Spa Shop */}
          <Grid item xs={12}>
            <ShopPageTop>
              <SpaName variant="h5" sx={{ textTransform: "capitalize" }}>
                {shop.salonName}
              </SpaName>
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
                  <Typography variant="h5" color="text.secondary">
                    {shop.salonRating}
                  </Typography>
                  <Rating
                    name="review-only"
                    value={shop.salonRating}
                    readOnly
                    size="large"
                    precision={0.5}
                  />
                  <Typography variant="h5" color="text.secondary">
                    {shop.reviewsNumber} Reviews
                  </Typography>
                </Box>

                {/* Address */}

                <Typography variant="h5" color="text.secondary">
                  <PlaceOutlinedIcon />
                  {shop.salonAddress}
                </Typography>
              </DescriptColumn>

              {/* Component: Image List / Carousel (temp) */}
              <ImageList shop={shop} />;
            </ShopPageTop>
          </Grid>

          {/* Decription of Spa Shop and Start Booking Now */}
          <Grid item md={12}>
            <ShopPageMid>
              <Grid
                container
                columnSpacing={1}
                rowSpacing={2}
                columns={{ md: 12, xs: 4 }}
              >
                <Grid item md={9} xs={2}>
                  <Box sx={{ width: "100%" }}>
                    <AboutTitle variant="h4"> About </AboutTitle>
                    <AboutDescription align="justify">
                      {shop.description}
                    </AboutDescription>

                    <AboutTitle variant="h4"> Working Hours </AboutTitle>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: 300,
                      }}
                    >
                      <List>
                        {shop.workDays.map((workDay) => (
                          <ListItem
                            key={workDay.workDay}
                            disableGutters
                            disablePadding
                          >
                            <ListItemText
                              primary={
                                <AboutDescription>
                                  {" "}
                                  {workDay.workDay}{" "}
                                </AboutDescription>
                              }
                            />
                            <ListItemText
                              primary={
                                <AboutDescription>
                                  {" "}
                                  {workDay.startTime
                                    .split(":")
                                    .slice(0, 2)
                                    .join(":")}{" "}
                                  -{" "}
                                  {workDay.endTime
                                    .split(":")
                                    .slice(0, 2)
                                    .join(":")}
                                </AboutDescription>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </Grid>
                {/* Represent the Info Box and Reserve the Booking Slot */}
                <Grid item md={3} xs={2}>
                  <SpaInfoBox shop={shop} />
                </Grid>
              </Grid>
            </ShopPageMid>
          </Grid>

          {/* Previous Review Lists & Average Total Reviews */}
          <Grid item md={12}>
            <ShopPageBottom>
              <AboutTitle variant="h4"> Reviews </AboutTitle>
              <ReviewLists shop={shop} />
            </ShopPageBottom>
          </Grid>
        </Grid>
      </ShopPageWrapper>
    </React.Fragment>
  );
}

const ShopPageWrapper = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginTop: "3rem",
  marginBottom: "3rem",
  maxHeight: "100%",
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "hidden",
}));

const ShopPageTop = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const SpaName = styled(Typography)(({ theme }) => ({
  fontSize: "3.125rem",
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

const ShopPageMid = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: theme.typography.Bold,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: theme.typography.Light,
  lineHeight: "1.87rem",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  textTransform: "capitalize",
}));

const ShopPageBottom = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  width: "100%",
}));

export default ShopPage;

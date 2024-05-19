import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ServicesCart from "../ServicesCart/ServicesCart";
import { useParams } from "react-router-dom";
import httpRequest from "../../utils/httpRequests";

function ServiceSelections({ handleComplete }) {
  // Control the state of categories, error handling
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Fetch services for selected category
  const [services, setServices] = useState([]);

  //Get Salon ID
  const { shopID } = useParams();


  //Call API for getting all category and services
  useEffect(() => {
    httpRequest
      .get(`salon/id/${shopID}/service-categories`)
      .then((response) => {
        setCategories(response.data.serviceCategories);
        console.log(response.data.serviceCategories);
      })
      .catch((error) => {
        setError(error);
      });
  }, [shopID]);

  // Control state when the user select one of the service categories, it will be on clicked as selected, change color
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Control category state when the app first display, it will highlight the state at the first category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  //Get selected item from category
  useEffect(() => {
    if (selectedCategory) {
      httpRequest
        .get(`service-category/id/${selectedCategory.id}/services`)
        .then((response) => {
          setServices(response.data.services);
          console.log(response.data.services);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [selectedCategory]);

  // Control Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Save the data in the local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Handle button click
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  //Add to cart
  const handleAddToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  //Remove an item to cart
  const handleRemoveFromCart = (service) => {
    setCart((prevCart) => {
      const index = prevCart.indexOf(service);
      if (index !== -1) {
        return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
      } else {
        return prevCart;
      }
    });
  };

  //Error display
  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <React.Fragment>
      <ServiceSelectionWrapper>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={4}
          columns={{ xs: 6, md: 12 }}
        >
          {/* Section: Service Categories Lists */}
          <Grid item md={3} xs={3}>
            <ServiceTitle> Service Categories </ServiceTitle>
            <List component="div" aria-label="service categories lists">
              {categories.map((category) => (
                <ListItemButton
                  selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  key={category.id}
                >
                  <ListItemText
                    sx={{ textTransform: "uppercase" }}
                    key={category.id}
                    primary={category.serviceCategoryName}
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid>
          {/* Select specific service */}
          <Grid item md={6} xs={3}>
            <ServiceTitle> Services </ServiceTitle>

            {/* Services Lists */}
            <ServiceLists>
              {services && (
                <>
                  <List>
                    {services.map((service) => (
                      <ListItem key={service.id}>
                        <Card
                          key={service.id}
                          variant="outlined"
                          sx={{ width: "90%", my: 1 }}
                        >
                          <CardContent>
                            <Typography
                              variant="h5"
                              sx={{
                                my: 1,
                                color: "#000",
                                textTransform: "capitalize",
                              }}
                              fontWeight="Bold"
                            >
                              {service.serviceName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {service.price} VND
                            </Typography>
                            <Typography variant="h6">
                              {service.duration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textTransform: "capitalize"}}>
                              {service.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#F98700",
                                ":hover": {
                                  bgcolor: "#F98700",
                                  color: "white",
                                },
                              }}
                              onClick={() => handleAddToCart(service)}
                            >
                              {" "}
                              Select{" "}
                            </Button>
                          </CardActions>
                        </Card>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </ServiceLists>
          </Grid>
          <Grid item xs={6} md={3}>
            <ServiceTitle> Selected </ServiceTitle>
            <ServicesCart
              handleComplete={handleComplete}
              removeCart={handleRemoveFromCart}
              cart={cart}
            />
          </Grid>
        </Grid>
      </ServiceSelectionWrapper>
    </React.Fragment>
  );
}

const ServiceSelectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: theme.typography.SemiBold,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const ServiceLists = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "400px",
  overflow: "auto",
}));

export default ServiceSelections;

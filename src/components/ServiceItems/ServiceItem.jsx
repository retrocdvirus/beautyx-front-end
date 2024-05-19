import { Box, Button, List, ListItem, Typography, styled } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function ServiceItem({ removeCart, cart }) {
  return (
    <React.Fragment>
      <List>
      {cart.map((service) => (
        <ListItem key={service.id} disablePadding>
          <Service>
            <Box sx={{ p: 2 }}>
              <ServiceName sx={{textTransform: "capitalize"}}> {service.serviceName} </ServiceName>
              <ServicePrice>
                <Typography sx={{ fontSize: "12px", }}> {service.price}VND </Typography>
                <Typography sx={{ fontSize: "12px", }}> {service.duration} </Typography>
              </ServicePrice>
            </Box>

            {/* Section: Remove Button */}
            <RemoveWrapper>
              <RemoveButton
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => removeCart(service)}
              >
                Remove
              </RemoveButton>
            </RemoveWrapper>
          </Service>
        </ListItem>
      ))}
      </List>
    </React.Fragment>
  );
}

const Service = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.ComponentBackground,
}));

const ServiceName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.SemiBold,
  width: "100%",
  marginBottom: theme.spacing(1),
}));

const ServicePrice = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  width: "100%",
  gap: 6,
}));

const RemoveWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  fontSize: "0.6rem",
  width: "100%",
  height: "30px",
}));

export default ServiceItem;

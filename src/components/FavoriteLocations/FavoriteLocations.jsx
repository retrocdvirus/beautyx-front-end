import React from "react";
// import { Box } from "@mui/material";
import FavoriteLocationCard from "./FavoriteLocationCard";
// import { styled } from "@mui/material/styles";
import { CustomAppointmentCardContainer } from "../AppointmentHistory/AppointmentHistory";

function FavoriteLocations({ favoriteLocations }) {
  return (
    <>
      {favoriteLocations.length !== 0 ? (
        <CustomAppointmentCardContainer>
          {favoriteLocations.map((favoriteLocation, index) => (
            <FavoriteLocationCard
              key={index}
              favoriteLocation={favoriteLocation}
            />
          ))}
        </CustomAppointmentCardContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default FavoriteLocations;

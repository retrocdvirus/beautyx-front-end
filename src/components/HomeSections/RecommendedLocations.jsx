import { Tabs, Tab, Typography, Card, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationCard from "./LocationCard";
import httpRequest from "../../utils/httpRequests";

function extraPropsForRecommendedLocations(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    value: index,
  };
}

export default function RecommendedLocations() {
  const [shops, setShops] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Call API forr getting all shop based on search
  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await httpRequest.get(`salon/search/query`, {
          params: {
            pageSize: 12,
            pageNumber: 1,
            searchKey: "m",
          },
        });
        setShops(response.data.salonPage.filter((shop) => shop !== null));
      } catch (error) {
        console.error(error);
      }
    };

    getShops();
  }, []);

  // const handlePrevClick = () => {
  //   setIndex((prevIndex) =>
  //     prevIndex === 0 ? shops.length - 4 : prevIndex - 1
  //   );
  // };

  // const handleNextClick = () => {
  //   setIndex((prevIndex) =>
  //     prevIndex === shops.length - 4 ? 0 : prevIndex + 1
  //   );
  // };

  return (
    <ShopListsWrapper>
      {/* Heading */}
      <RecommendedHeading>Recommeded Locations</RecommendedHeading>

      <LocationCardsWrapper
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="visible arrows tabs example"
      >
        {shops.map((spaShop, i) => {
          let imageUrl;
          if (spaShop.salonPhotos && spaShop.salonPhotos !== "") {
            // Split the salonPhotos string into an array
            const photos = spaShop.salonPhotos.split(",");
            // Find the wallpaper image
            const card = photos.find((photo) => photo.includes("card"));
            imageUrl = `http://localhost:3000/salon/pictures/${card}`;
          } else {
            // Provide a default image URL when salonPhotos is null
            imageUrl = "https://images.adsttc.com/media/images/5e01/6d86/3312/fd44/b400/026e/large_jpg/10_%E5%A4%A7%E5%A0%82%E6%B2%90%E8%B6%B3%E5%8C%BA.jpg?1577151868"; // replace with your default image URL
          }
          console.log(imageUrl);
          return (
            <Tab
              component={Card}
              key={i}
              label={<LocationCard spaShop={spaShop} image={imageUrl} />}
              {...extraPropsForRecommendedLocations(i)}
            />
          );
        })}
      </LocationCardsWrapper>
    </ShopListsWrapper>
  );
}

const ShopListsWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const RecommendedHeading = styled(Typography)(({ theme }) => ({
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

const LocationCardsWrapper = styled(Tabs)(({ theme }) => ({
  width: "100%",
  "& .MuiTabs-flexContainer": {
    display: "flex",
    alignItems: "stretch",
    gap: "6px",
    "& .MuiCard-root": {
      width: "188px",
      height: "228px",
      padding: 0,
      border: "1px solid #D3D3D3",
      borderRadius: "8px",
      boxShadow: "none",
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
      "& .MuiCard-root": {
        width: "220px",
        height: "248px",
      },
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
      "& .MuiCard-root": {
        width: "250px",
        height: "278px",
      },
    },
    "& .MuiTabScrollButton-root": {
      width: "40px",
      "& svg": {
        fontSize: "3rem",
      },
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiTabs-flexContainer": {
      "& .MuiCard-root": {
        width: "270px",
        height: "298px",
      },
    },
  },
}));

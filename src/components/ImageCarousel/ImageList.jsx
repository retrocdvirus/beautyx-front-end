import { ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import React from "react";

function ImageCarousel({ shop }) {
  let imageUrl, imageUrl1, imageUrl2;
  if (shop.salonPhotos && shop.salonPhotos !== "") {
    // Split the salonPhotos string into an array
    const photos = shop.salonPhotos.split(",");
    // Find the wallpaper image
    const wallpaper = photos.find((photo) => photo.includes("wallpaper"));
    imageUrl = `http://localhost:3000/salon/pictures/${wallpaper}`;
  } else {
    // Provide a default image URL when salonPhotos is null
    imageUrl = "https://images.adsttc.com/media/images/5e01/6d86/3312/fd44/b400/026e/large_jpg/10_%E5%A4%A7%E5%A0%82%E6%B2%90%E8%B6%B3%E5%8C%BA.jpg?1577151868"; // replace with your default image URL
  }
  console.log(imageUrl);

  if (shop.salonPhotos && shop.salonPhotos !== "") {
    // Split the salonPhotos string into an array
    const photos = shop.salonPhotos.split(",");
    // Find the wallpaper image
    const gallery1 = photos.find((photo) => photo.includes("gallery1"));
    imageUrl1 = `http://localhost:3000/salon/pictures/${gallery1}`;
  } else {
    // Provide a default image URL when salonPhotos is null
    imageUrl1 = "https://images.adsttc.com/media/images/5e01/6d48/3312/fdc3/3200/06c6/medium_jpg/06_%E5%BE%85%E5%AE%A2%E5%A4%A7%E5%A0%824.jpg?1577151803";
  }
  console.log(imageUrl);

  if (shop.salonPhotos && shop.salonPhotos !== "") {
    // Split the salonPhotos string into an array
    const photos = shop.salonPhotos.split(",");
    // Find the wallpaper image
    const gallery2 = photos.find((photo) => photo.includes("gallery2"));
    imageUrl2 = `http://localhost:3000/salon/pictures/${gallery2}`;
  } else {
    // Provide a default image URL when salonPhotos is null
    imageUrl2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrS_0cfahS5nfeoSNsZmw2AX8l_fEGr8sgF_KDj4mvk_JTKtk6vJkRCVkCOsnm2cNQGE&usqp=CAU";
  }
  console.log(imageUrl);

  const itemData = [
    {
      img: `${imageUrl}`,
      title: "Image1",
      rows: 2,
      cols: 3,
    },
    {
      img: `${imageUrl1}`,
      title: "Image2",
      rows: 1,
      cols: 1,
    },
    {
      img: `${imageUrl2}`,
      title: "Image3",
    },
  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  return (
    <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={4}
      rowHeight={250}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 250, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageCarousel;

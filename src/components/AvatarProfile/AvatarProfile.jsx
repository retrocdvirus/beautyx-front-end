import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Image from "mui-image";
import UserAvatar from "../../assets/images/profile-pic.jpg";

function AvatarProfile() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Image
        src={UserAvatar}
        width={140}
        height={140}
        duration={0}
        easing="unset"
        sx={{
          borderRadius: "50%",
        }}
      />
      <Button
        sx={{
          lineHeight: "100%",
          fontSize: { xs: "16px", sm: "18px" },
          color: "#9E9E9E",
          backgroundColor: "#E7E7E7",
          borderRadius: "8px",
          padding: { xs: "10px 18px" },
          "&:hover": {
            color: "#9E9E9E",
            backgroundColor: "#E7E7E7",
          },
        }}
      >
        Upload photo
      </Button>
    </Box>
  );
}

export default AvatarProfile;

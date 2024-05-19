import { Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import GoogleIcon from "../../assets/images/google.png";
import SocialMediaButton from "./SocialMediaButton";

function GoogleButton({onOpenRegister}) {
  return (
    <SocialMediaButton onClick={() => onOpenRegister()}>
      {/* <Image
        src={GoogleIcon}
        width={26}
        height={26}
        duration={0}
        easing="unset"
      /> */}
      <Typography sx={{ fontSize: "18px", color: "#000" }}>
        Register an account
      </Typography>
    </SocialMediaButton>
  );
}

export default GoogleButton;

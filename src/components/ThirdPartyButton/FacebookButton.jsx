import { Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import FacebookIcon from "../../assets/images/facebook.png";
import SocialMediaButton from "./SocialMediaButton";

function FacebookButton({onOpenSignIn}) {
  return (
    <SocialMediaButton onClick={() => onOpenSignIn()}>
      {/* <Image
        src={FacebookIcon}
        width={26}
        height={26}
        duration={0}
        easing="unset"
      /> */}
      <Typography sx={{ fontSize: "18px", color: "#000" }}>
        Log In with Your Account
      </Typography>
    </SocialMediaButton>
  );
}

export default FacebookButton;

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewUserProfileInfo( profile ) {
  const navigate = useNavigate();
  const { userID } = useParams();

  return (
    <ProfileInfoContainer>
      <Box className="container">
        <Box>
          <Typography className="view-profile-title">First name</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.firstname} </Typography>
        </Box>
        <Box>
          <Typography className="view-profile-title">Last name</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.lastname} </Typography>
        </Box>
      </Box>
      <Box className="container">
        <Box>
          <Typography className="view-profile-title">Phone number</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.phone ?? 'none'} </Typography>
        </Box>
        <Box>
          <Typography className="view-profile-title">Email</Typography>
          <Typography className="description"> {profile?.profile?.email ?? 'none'} </Typography>
        </Box>
      </Box>
      <Box className="container">
        <Box>
          <Typography className="view-profile-title">Gender</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.gender ?? 'none'} </Typography>
        </Box>
        <Box>
          <Typography className="view-profile-title">Date of birth</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.dateOfBirth ?? 'none'} </Typography>
        </Box>
      </Box>
      <Box className="city-address-container">
        <Box sx={{ marginBottom: "30px" }}>
          <Typography className="view-profile-title">City</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}> {profile?.profile?.city ?? 'none'} </Typography>
        </Box>
        <Box>
          <Typography className="view-profile-title">Address</Typography>
          <Typography className="description" sx={{textTransform: "capitalize"}}>
          {profile?.profile?.address ?? 'none'}
          </Typography>
        </Box>
      </Box>

      <EditProfileButton onClick={() => navigate(`/profile/${userID}/edit`)}>
        Edit
      </EditProfileButton>
    </ProfileInfoContainer>
  );
}

export const ProfileInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 18,
  "& .MuiTypography-root": {
    fontWeight: 500,
  },
  "& .view-profile-title": {
    fontSize: 26,
  },
  "& .settings-heading": {
    fontSize: 24,
    fontWeight: 700,
  },
  "& .setting-title": {
    fontSize: 18,
  },
  "& .description": {
    fontSize: 22,
    color: "#484848",
  },
  [theme.breakpoints.up("sm")]: {
    gap: 30,
    padding: "22px 18px",
    "& .view-profile-title": {
      fontSize: 22,
    },
    "& .description": {
      fontSize: 18,
    },
    "& .container": {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiBox-root": {
        width: "50%",
      },
    },
    "& .input-container": {
      gap: "18px",
      "& .MuiBox-root": {
        width: "100%",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    padding: "30px 22px",
    "& .city-address-container": {
      display: "flex",
      "& .MuiBox-root": {
        margin: 0,
        width: "50%",
      },
    },
    "& .input-container": {
      gap: "18px",
    },
    "& .setting-title": {
      fontSize: 20,
    },
  },
  [theme.breakpoints.up("lg")]: {
    padding: "40px 90px",
  },
}));

export const EditProfileButton = styled(Button)(({ theme }) => ({
  marginTop: "40px",
  height: "44px",
  width: "100%",
  color: "#fff",
  border: "none",
  fontSize: "24px",
  textTransform: "none",
  lineHeight: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "10px",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.up("sm")]: {
    width: "134px",
  },
  [theme.breakpoints.up("md")]: {
    width: "200px",
    height: "50px",
    fontSize: "30px",
  },
}));

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  InputLabel,
} from "@mui/material";
import { EditProfileButton, ProfileInfoContainer } from "./ViewUserProfileInfo";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserProfileInfo(props) {
  const navigate = useNavigate();
  const { userID } = useParams();

  const {
    profile
  } = props;

  console.log(profile);

  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputDateOfBirth, setInputDateOfBirth] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [value, setValue] = React.useState("male");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ProfileInfoContainer>
      <Box className="container input-container">
        <Box>
          <Typography className="view-profile-title">First name</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder={profile?.firstname}
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography className="view-profile-title">Last name</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder={profile?.lastname}
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
        </Box>
      </Box>
      <Box className="container input-container">
        <Box>
          <Typography className="view-profile-title">Phone number</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder={profile?.phone ?? 'none'}
            value={inputPhoneNumber}
            onChange={(e) => setInputPhoneNumber(e.target.value)}
          />
        </Box>
        <Box>
          <Typography className="view-profile-title">Email</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder={profile?.email ?? 'none'}
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Typography className="view-profile-title">Gender</Typography>
        <RadioGroup
          row
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{ gap: "18px" }}
        >
          <CustomRadioButtonContainer>
            <CustomRadioButton id="male" value="male" name="gender" />
            <CustomInputLabel htmlFor="male">Male</CustomInputLabel>
          </CustomRadioButtonContainer>
          <CustomRadioButtonContainer>
            <CustomRadioButton id="female" value="female" name="gender" />
            <CustomInputLabel htmlFor="female">Female</CustomInputLabel>
          </CustomRadioButtonContainer>
          <CustomRadioButtonContainer>
            <CustomRadioButton id="female" value="other" name="other" />
            <CustomInputLabel htmlFor="other">Other</CustomInputLabel>
          </CustomRadioButtonContainer>
        </RadioGroup>
      </Box>
      <Box>
        <Typography className="view-profile-title">Date of birth</Typography>
        <CustomTextField
          variant="outlined"
          type="text"
          hiddenLabel
          required
          placeholder={profile?.dateOfBirth ?? 'none'}
          value={inputDateOfBirth}
          onChange={(e) => setInputDateOfBirth(e.target.value)}
        />
      </Box>
      <Box>
        <Typography className="view-profile-title">City</Typography>
        <CustomTextField
          variant="outlined"
          type="text"
          hiddenLabel
          required
          placeholder={profile?.city ?? 'none'}
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
      </Box>
      <Box>
        <Typography className="view-profile-title">Address</Typography>
        <CustomTextField
          variant="outlined"
          type="text"
          hiddenLabel
          required
          placeholder={profile?.address ?? 'none'}
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </Box>

      <EditProfileButtonGroup>
        <EditProfileButton
          onClick={() => navigate(`/profile/${userID}`)}
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            color: "#B6B6B6",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#B6B6B6",
            },
          }}
        >
          Cancel
        </EditProfileButton>
        <EditProfileButton sx={{ width: "100%" }}>Save</EditProfileButton>
      </EditProfileButtonGroup>
    </ProfileInfoContainer>
  );
}

export const CustomTextField = styled(TextField)(() => ({
  width: "100%",
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-root": {
    color: "#484848",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputBase-input": {
    padding: "8px 18px",
  },
}));

const CustomRadioButtonContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

const CustomRadioButton = styled(Radio)(() => ({
  padding: 0,
  "&.Mui-checked": {
    color: "#484848",
  },
}));

const CustomInputLabel = styled(InputLabel)(() => ({
  color: "#000",
  fontWeight: 500,
}));

export const EditProfileButtonGroup = styled(Box)(({ theme }) => ({
  marginTop: "50px",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  "& .MuiButtonBase-root": {
    margin: 0,
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

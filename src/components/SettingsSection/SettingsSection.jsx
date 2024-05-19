import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import {
  CustomTextField,
  EditProfileButtonGroup,
} from "../NavigationTabs/EditUserProfileInfo";
import {
  EditProfileButton,
  ProfileInfoContainer,
} from "../NavigationTabs/ViewUserProfileInfo";
import { useNavigate } from "react-router-dom";

function SettingsSection() {
  const [inputPassword, setInputPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [deleteAcc, setDeleteAcc] = useState(false);

  return (
    <>
      {/* Resetting password section */}
      <ProfileInfoContainer
        sx={{
          padding: { sm: "22px 18px", md: "30px 22px", lg: "40px 90px" },
        }}
      >
        <Typography className="settings-heading">Reset Password</Typography>
        <Box>
          <Typography className="setting-title">Old Password</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder="liverpool"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </Box>

        <Box>
          <Typography className="setting-title">New Password</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>

        <Box>
          <Typography className="setting-title">Confirm Password</Typography>
          <CustomTextField
            variant="outlined"
            type="text"
            hiddenLabel
            required
            placeholder="Confirm your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>

        <EditProfileButtonGroup>
          <EditProfileButton
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
          <EditProfileButton sx={{ width: "100%" }}>Reset</EditProfileButton>
        </EditProfileButtonGroup>
      </ProfileInfoContainer>

      {/* Deleting account section */}
      <Box
        sx={{
          marginTop: "50px",
          backgroundColor: "#E2F5FA",
          padding: { xs: "22px 18px", md: "30px 22px", lg: "40px 90px" },
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
          Account Deletion
        </Typography>
        <Typography sx={{ fontSize: "20px" }}>
          Your account will be deleted permanently.
        </Typography>

        <EditProfileButton
          onClick={() => setDeleteAcc(true)}
          sx={{
            marginTop: "26px",
            width: { xs: "100%", sm: "260px" },
            fontSize: { sm: "20px" },
            backgroundColor: "#fff",
            color: "#FF5151",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#fff",
              color: "#FF5151",
            },
          }}
        >
          Delete my account
        </EditProfileButton>
      </Box>

      <Dialog
        open={deleteAcc}
        onClose={() => setDeleteAcc(false)}
        sx={{
          height: "100vh",
          "& .MuiPaper-root": {
            margin: 0,
            borderRadius: "20px",
            width: {
              xs: "320px",
              sm: "400px",
              md: "440px",
            },
            height: "auto",
            boxShadow: "none",
          },
          "& .MuiDialogContent-root": {
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "30px",
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              textAlign: "center",
              padding: 0,
              marginBottom: "30px",
            }}
          >
            You are about to delete your account permanently. Are you sure about
            this?
          </DialogTitle>

          {/* Register button */}
          <DialogActions
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Button
              onClick={() => setDeleteAcc(false)}
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#E7E7E7",
                  boxShadow: "none",
                },
                width: "100%",
                border: "none",
                color: "#9E9E9E",
                backgroundColor: "#E7E7E7",
                fontSize: "22px",
                boxShadow: "none",
                paddingY: "4px",
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#FF5151",
                  boxShadow: "none",
                },
                width: "100%",
                border: "none",
                color: "#fff",
                backgroundColor: "#FF5151",
                fontSize: "22px",
                boxShadow: "none",
                paddingY: "4px",
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SettingsSection;

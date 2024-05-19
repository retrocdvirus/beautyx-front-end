import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import GoogleButton from "../ThirdPartyButton/GoogleButton";
import FacebookButton from "../ThirdPartyButton/FacebookButton";
import httpRequest from "../../utils/httpRequests";
import CustomInputField from "./CustomInputField";
import CustomButton from "./CustomButton";

const LoginForm = ({ open, onClose, onSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //Handle Validate
  const validate = () => {
    const errors = {};
    if (!formData.email.includes("@")) {
      errors.email = "Email must be a valid email address";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  //Handle Submit by using API
  httpRequest.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await httpRequest.post("authen/general/login", formData);
      if (response.status === 200) {
        onSignIn(response.data);
        console.log(response.data);
        
        onClose();
      }
    } catch (error) {
      setSnackbarMessage("Sign in failed. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
    console.log("handleSubmit called");
  };

  // useEffect(() => {
  //   // Check for access token in local storage when the page loads
  //   const cookies = document.cookie.split("; ");
  //   const access_token = cookies
  //     .map((cookie) => cookie.split("="))
  //     .find(([name]) => name === "Authentication");// temp for testing: access_token
  //   if (access_token) {
  //     // Use access token to authenticate user
  //     httpRequest
  //       .get("authen/profile", {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           // User is authenticated
  //           // Set signedIn state to true and update user data
  //           onSignIn(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         // Handle error
  //         console.error(error);
  //       });
  //   }
  // }, [onSignIn]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          height: "100vh",
          "& .MuiPaper-root": {
            margin: 0,
            borderRadius: "20px",
            width: {
              xs: "340px",
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
            paddingX: "30px",
            paddingTop: "16px",
            paddingBottom: "30px",
          }}
        >
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
          <DialogActions
            sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
          >
            <CloseIcon
              onClick={onClose}
              sx={{ width: "34px", height: "34px", cursor: "pointer" }}
            />
          </DialogActions>
          <DialogTitle
            sx={{
              "@media (min-width: 0)": {
                fontSize: "24px",
              },
              "@media (min-width: 600px)": {
                fontSize: "30px",
              },
              fontWeight: "bold",
              textAlign: "center",
              padding: 0,
              marginBottom: "14px",
            }}
          >
            Login
          </DialogTitle>

          {/* Input fields   */}
          <Stack spacing={1}>
            <Stack>
              <Box component="p" sx={{ color: "#000", margin: 0 }}>
                Email
              </Box>
              <CustomInputField
                hiddenLabel
                name="email"
                variant="outlined"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    color: "#575757",
                    borderRadius: "10px",
                    backgroundColor: "#F0F0F0",
                    "@media (min-width: 0)": {
                      fontSize: "0.8rem",
                    },
                    "@media (min-width: 600px)": {
                      fontSize: "1.1rem",
                    },
                  },
                  "& .MuiInputBase-input": {
                    "@media (min-width: 0)": {
                      paddingX: "18px",
                      paddingY: "8px",
                    },
                    "@media (min-width: 600px)": {
                      paddingY: "10px",
                    },
                  },
                }}
              />
            </Stack>
            <Stack>
              <Box component="p" sx={{ color: "#000", margin: 0 }}>
                Password
              </Box>
              <CustomInputField
                hiddenLabel
                name="password"
                variant="outlined"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    color: "#575757",
                    borderRadius: "10px",
                    backgroundColor: "#F0F0F0",
                    "@media (min-width: 0)": {
                      fontSize: "0.8rem",
                    },
                    "@media (min-width: 600px)": {
                      fontSize: "1.1rem",
                    },
                  },
                  "& .MuiInputBase-input": {
                    "@media (min-width: 0)": {
                      paddingX: "18px",
                      paddingY: "8px",
                    },
                    "@media (min-width: 600px)": {
                      paddingY: "10px",
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          {/* Login button */}
          <DialogActions sx={{ padding: 0 }}>
            <CustomButton
              onClick={handleSubmit}
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#175C4C",
                  boxShadow: "none",
                },
                width: "100%",
                marginTop: "18px",
                border: "none",
                color: "#ffffff",
                backgroundColor: "#175C4C",
                fontSize: "22px",
                boxShadow: "none",
                paddingY: "4px",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </CustomButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;

import React from "react";
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
  Alert,
  AlertTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FacebookButton from "../ThirdPartyButton/FacebookButton";
import GoogleButton from "../ThirdPartyButton/GoogleButton";
import httpRequest from "../../utils/httpRequests";
import CustomInputField from "./CustomInputField";
import CustomButton from "./CustomButton";

const RegisterForm = ({ open, onClose, onOpenSignIn }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //Handle Validate
  const validate = () => {
    const errors = {};
    if (!formData.email.includes("@")) {
      errors.email = "Email must be a valid email address";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (formData.firstname.length < 2) {
      errors.firstname = "First name must be at least 2 characters long";
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter, one number and one symbol";
    }
    if (formData.lastname.length < 2) {
      errors.lastname = "Last name must be at least 2 characters long";
    }
    return errors;
  };

  //Handle Register API
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await httpRequest.post(
        "authen/general/register",
        formData
      );
      if (response.status === 201) {
        setShowAlert(true);
        setAlertType("success");
        setOpenSnackbar(true);
        onClose();
        onOpenSignIn();
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
      >
        <Box component="div">
          {showAlert && (
            <Alert severity={alertType}>
              <AlertTitle>
                {alertType === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alertType === "success"
                ? "Register successfully"
                : "Register unsuccessfully — Please try again"}
            </Alert>
          )}
        </Box>
      </Snackbar>

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
            padding: { xs: "16px 20px", sm: "24px 30px" },
          }}
        >
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
                fontSize: "20px",
              },
              "@media (min-width: 600px)": {
                fontSize: "24px",
              },
              fontWeight: 600,
              textAlign: "center",
              padding: 0,
              marginBottom: "10px",
            }}
          >
            Register
          </DialogTitle>

          {/* Input fields   */}
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "8px", sm: "4px" },
              }}
            >
              <Box>
                <Typography sx={{ color: "#000", margin: 0 }}>
                  First Name
                </Typography>
                <CustomInputField
                  hiddenLabel
                  name="firstname"
                  variant="outlined"
                  placeholder="Your first name"
                  type="text"
                  onChange={handleChange}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  required
                />
              </Box>

              <Box>
                <Typography sx={{ color: "#000", margin: 0 }}>
                  Last Name
                </Typography>
                <CustomInputField
                  hiddenLabel
                  name="lastname"
                  variant="outlined"
                  placeholder="Your last name"
                  type="text"
                  onChange={handleChange}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  required
                />
              </Box>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", margin: 0 }}>Email</Typography>
              <CustomInputField
                hiddenLabel
                name="email"
                variant="outlined"
                placeholder="Your email"
                type="email"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Box>

            <Box>
              <Typography sx={{ color: "#000", margin: 0 }}>
                Password
              </Typography>
              <CustomInputField
                hiddenLabel
                name="password"
                variant="outlined"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
              />
            </Box>

            <Box>
              <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  defaultValue="customer"
                  sx={{display: "flex", flexDirection: "row"}}
                >
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="manager"
                    control={<Radio />}
                    label="Manager"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Stack>

          {/* Register button */}
          <DialogActions sx={{ padding: 0 }}>
            <CustomButton
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
            >
              {loading ? <CircularProgress size={22} /> : "Register"}
            </CustomButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterForm;

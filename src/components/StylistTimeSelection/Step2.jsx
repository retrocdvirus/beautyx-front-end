import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useReducer } from "react";
import MoreIcon from "@mui/icons-material/More";
// import SpaImg from "../../img/SpaImg.jpg";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StylistTimeCart from "../ServicesCart/StylistTimeCart";
import dayjs from "dayjs";
import httpRequest from "../../utils/httpRequests";
import { useParams } from "react-router-dom";

// Custom Avatar
const StyledAvatar = styled(Avatar)(({ theme, selected }) => ({
  cursor: "pointer",
  border: `2px solid ${selected ? theme.palette.primary.main : "transparent"}`,
  width: 85,
  height: 85,
}));

const initialState = {
  appointmentDate: null,
  appointmentStartTime: null,
  employees: [],
  selectedEmployees: [],
  openSnackbar: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setAppointmentDate":
      return { ...state, appointmentDate: action.payload };
    case "setAppointmentStartTime":
      return { ...state, appointmentStartTime: action.payload };
    case "setEmployees":
      return { ...state, employees: action.payload };
    case "setSelectedEmployees":
      return { ...state, selectedEmployees: action.payload };
    case "setOpenSnackbar":
      return { ...state, openSnackbar: action.payload };
    case "setErrorMessage":
      return { ...state, errorMessage: action.payload };
    default:
      throw new Error();
  }
}

function StylistTimeSelection({ handleComplete }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    appointmentDate,
    appointmentStartTime,
    employees,
    selectedEmployees,
    openSnackbar,
    errorMessage,
  } = state;

  const { shopID } = useParams();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalTime = cart.reduce(
    (total, service) =>
      total +
      parseInt(service.duration.split(":")[0]) * 60 +
      parseInt(service.duration.split(":")[1]),
    0
  );

  const appointmentEndTime = dayjs(appointmentStartTime).add(
    totalTime,
    "minute"
  );

  const aDate = dayjs(appointmentDate).format("YYYY-MM-DD");
  const startTime = dayjs(appointmentStartTime).format("HH:mm:ss");
  const endTime = dayjs(appointmentEndTime).format("HH:mm:ss");

  console.log(aDate);
  console.log(startTime);
  console.log(endTime);

  // Function to handle checking employee availability
  const handleCheckAvailability = async () => {
    // Check if appointment start time has been selected
    if (!appointmentStartTime && !appointmentDate) {
      dispatch({
        type: "setErrorMessage",
        payload: "Please select appointment time",
      });
      dispatch({ type: "setOpenSnackbar", payload: true });
      return;
    }
    try {
      const response = await httpRequest.get(
        `employee/available/salon/id/${shopID}/date/${aDate}/start/${startTime}/end/${endTime}`
      );
      dispatch({ type: "setEmployees", payload: response.data });
    } catch (error) {
      dispatch({
        type: "setErrorMessage",
        payload:
          "An error occurred while checking employee availability. Please try again later.",
      });
      dispatch({ type: "setOpenSnackbar", payload: true });
    }
  };

  const handleSelectEmployee = (employee) => {
    dispatch({
      type: "setSelectedEmployees",
      payload: selectedEmployees.includes(employee)
        ? selectedEmployees.filter((e) => e !== employee)
        : [...selectedEmployees, employee],
    });
  };

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ServiceSelectionWrapper>
          <ServiceTitle> Select your Stylist </ServiceTitle>
          <StylistWrapper>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={1}
              columns={{ xs: 6, md: 12 }}
            >
              <Grid item md={12}>
                <Stack direction="row" spacing={3} sx={{ px: 3, py: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <SelectButton1 variant="outlined" sx={{ color: "#000" }}>
                      <MoreIcon sx={{ width: "50px", height: "50px" }} />
                    </SelectButton1>
                    <Typography> Any stylist </Typography>
                  </Box>

                  {employees.map((employee) => (
                    <Box
                      key={employee.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <StyledAvatar
                        onClick={() => handleSelectEmployee(employee)}
                        selected={selectedEmployees.includes(employee)}
                        sx={{textTransform: "capitalize"}}
                      >
                        {employee.firstname[0]}
                      </StyledAvatar>
                      <Typography sx={{textTransform: "capitalize"}}>
                        {`${employee.firstname} ${employee.lastname}`}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </StylistWrapper>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            columns={{ xs: 6, md: 12 }}
            sx={{ my: 3 }}
          >
            <Grid item md={8}>
              <ServiceTitle> Select Time </ServiceTitle>
              <TimeWrapper>
                <DatePicker
                  label="Appointment Date"
                  value={aDate}
                  onChange={(date) =>
                    dispatch({ type: "setAppointmentDate", payload: date })
                  }
                  slotProps={{ textField: { variant: "outlined" } }}
                />
                <TimePicker
                  label="Appointment Start Time"
                  value={startTime}
                  onChange={(time) =>
                    dispatch({ type: "setAppointmentStartTime", payload: time })
                  }
                  slotProps={{ textField: { variant: "outlined" } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckAvailability}
                >
                  Check Availability
                </Button>
              </TimeWrapper>
            </Grid>

            <Grid item md={4}>
              <ServiceTitle> Summary </ServiceTitle>
              <StylistTimeCart
                handleComplete={handleComplete}
                selectedEmployees={selectedEmployees}
                appointmentDate={aDate}
                appointmentStartTime={startTime}
                appointmentEndTime={endTime}
              />
            </Grid>
          </Grid>
        </ServiceSelectionWrapper>
      </LocalizationProvider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: "setOpenSnackbar", payload: false })}
      >
        <Alert
          onClose={() => dispatch({ type: "setOpenSnackbar", payload: false })}
          severity="error"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

const ServiceSelectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: theme.typography.SemiBold,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StylistWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.box,
}));

const SelectButton1 = styled(Button)(({ theme }) => ({
  width: "90px",
  height: "90px",
}));

const TimeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
}));

export default StylistTimeSelection;

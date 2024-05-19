import { Box, Typography, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

//Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

//Format Time
function formatTime(timeString) {
  const date = new Date(`1970-01-01T${timeString}Z`);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString("en-US", options);
}

function AcceptDenyButtons({
  appointmentId,
  handleAccept,
  handleDeny,
  status,
}) {
  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={() => handleAccept(appointmentId)}
        disabled={status !== "pending"}
      >
        {status === "approved" ? "Accept" : "Accept"}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeny(appointmentId)}
        disabled={status !== "pending"}
      >
        {status === "denied" ? "Deny" : "Deny"}
      </Button>
    </>
  );
}

function AppointmentInfo({ appointment, handleAccept, handleDeny }) {
  return (
    <>
      <Box>
        <CustomStyleAppointmentInfo>
          <Typography> {appointment.id} </Typography>
          <Typography>
            {" "}
            {appointment.customer.firstname} {appointment.customer.lastname}{" "}
          </Typography>
          <Typography>{formatDate(appointment.appointmentDate)}</Typography>
          <Typography>
            {formatTime(appointment.startTime)} -{" "}
            {formatTime(appointment.estimatedEndTime)}
          </Typography>
          <Typography>
            {appointment.employee.firstname} {appointment.employee.lastname}
          </Typography>
          <Typography>{appointment.approvalStatus}</Typography>
          <Box>
            <AcceptDenyButtons
              appointmentId={appointment.id}
              handleAccept={handleAccept}
              handleDeny={handleDeny}
              status={appointment.approvalStatus}
            />
          </Box>
        </CustomStyleAppointmentInfo>
        <Divider />
      </Box>
    </>
  );
}

const CustomStyleAppointmentInfo = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 24px",
  "& .MuiTypography-root": {
    width: "14%",
    textAlign: "center",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  "& .MuiBox-root": {
    display: "flex",
    gap: "12px",
    "& a": {
      color: "#000",
      fontWeight: 500,
    },
  },
}));

export default AppointmentInfo;

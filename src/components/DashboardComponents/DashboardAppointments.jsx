import { useEffect, useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import AppointmentCategories from "./AppointmentCategories";
import AppointmentInfo from "./AppointmentInfo";
import httpRequest from "../../utils/httpRequests";
import { useParams } from "react-router-dom";

function DashboardAppointments() {
  const { managerID } = useParams();
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [sortByCriteria, setSortByCriteria] = useState("");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  function fetchAppointments() {
    httpRequest
      .get(`manager/id/${managerID}/dashboard`)
      .then((response) => {
        setAppointments(response.data.appointments);
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleAccept(appointmentId) {
    httpRequest
      .put(
        `appointment/update/status/id/${appointmentId}`,
        { approvalStatus: "approved" }
      )
      .then((response) => {
        fetchAppointments();
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleDeny(appointmentId) {
    httpRequest
      .put(
        `appointment/update/status/id/${appointmentId}`,
        { approvalStatus: "denied" }
      )
      .then((response) => {
        fetchAppointments();
      })
      .catch((error) => console.error("Error:", error));
  }

  const handleFilterby = (event) => {
    setAppointmentStatus(event.target.value);
  };

  const handleSortby = (event) => {
    setSortByCriteria(event.target.value);
  };

  return (
    <>
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomStyleDropdownList
            displayEmpty
            renderValue={
              appointmentStatus !== "" ? undefined : () => "Filter by"
            }
            value={appointmentStatus}
            label="appointmentStatus"
            onChange={handleFilterby}
            sx={{ width: "20%" }}
          >
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Approved"}>Approved</MenuItem>
            <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
          </CustomStyleDropdownList>
          <CustomStyleDropdownList
            displayEmpty
            renderValue={sortByCriteria !== "" ? undefined : () => "Sort by"}
            value={sortByCriteria}
            label="appointmentStatus"
            onChange={handleSortby}
            sx={{ width: "20%" }}
          >
            <MenuItem value={"Recent appointments"}>
              Recent appointments
            </MenuItem>
            <MenuItem value={"Alphabetical"}>Alphabetical</MenuItem>
          </CustomStyleDropdownList>
        </Box>

        <AppointmentCategories />

        {appointments.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment} handleAccept={handleAccept}
          handleDeny={handleDeny} />
        ))}
      </Box>
    </>
  );
}

const CustomStyleDropdownList = styled(Select)(() => ({
  backgroundColor: "#175C4C",
  color: "#fff",
  borderRadius: "10px",
  "& svg": {
    color: "#fff",
  },
  "& .MuiSelect-select": {
    padding: "10px 0 10px 14px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
}));

export default DashboardAppointments;

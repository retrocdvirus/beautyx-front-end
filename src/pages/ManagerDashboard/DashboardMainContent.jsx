import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import DashboardAppointments from "../../components/DashboardComponents/DashboardAppointments";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/httpRequests";

function DashboardMainContent() {
  const { managerID } = useParams();
  const [ manager, setManager ] = useState(null);

  useEffect(() => {
    const getManager = async () => {
      try {
        const response = await httpRequest.get(`manager/id/${managerID}`);
        setManager(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getManager();
  }, [managerID]);

  if (!manager) {
    return <div>Loading...</div>;
  }

  if (manager) {
    console.log(manager);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CustomStyleHeader>
        <Typography className="welcome-title">Hello {manager.firstname} {manager.lastname} </Typography>
        <Typography className="welcome-description">
          Welcome you to {manager.salon.salonName}
        </Typography>
        <Typography className="branch-name">
          Address: {manager.salon.salonAddress}
          city
        </Typography>
      </CustomStyleHeader>
      <Box>
        <DashboardAppointments />
      </Box>
    </Box>
  );
}

const CustomStyleHeader = styled(Box)(() => ({
  marginTop: "82px",
  "& label": {
    color: "#fff",
    fontSize: "1.2rem",
  },
  "& .MuiTypography-root": {
    lineHeight: "100%",
    margin: 0,
  },
  "& .welcome-title": {
    fontSize: "38px",
    fontWeight: 700,
    color: "#175C4C",
    marginBottom: "20px",
    textTransform: "capitalize",
  },
  "& .welcome-description": {
    fontSize: "20px",
    marginBottom: "12px",
    textTransform: "capitalize",
  },
  "& .branch-name": {
    fontSize: "20px",
    marginBottom: "32px",
  },
  "& .MuiAutocomplete-root": {
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    padding: "10px 40px 10px 14px",
    color: "#fff",
  },
  "& .MuiAutocomplete-endAdornment": {
    alignSelf: "center",
    "& button": {
      color: "#fff",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
}));

export default DashboardMainContent;

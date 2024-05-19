import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        paddingX: { md: "60px", lg: "82px" },
      }}
    >
      {/* Other content */}
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../RegisterForm/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NavBar({
  signedIn,
  user,
  onOpenRegister,
  onOpenSignIn,
  onLogout,
}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    nav(`/profile/${user?.id}`);
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    onLogout();
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "70px",
        width: "100%",
        zIndex: 2,
      }}
    >
      <AppBar
        sx={{
          height: "66px",
          paddingX: { xs: "14px", sm: "40px", md: "60px", lg: "82px" },
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            padding: { xs: 0 },
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HeaderBrandName onClick={() => navigate("/")}>
            BeautyX
          </HeaderBrandName>
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ p: 0, display: { xs: "flex", sm: "none" } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon sx={{ color: "#fff", fontSize: "32px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              width: "200px",
              // position: "absolute",
            }}
          >
            <MenuItem>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">Register</Typography>
            </MenuItem>
          </Menu>

          {/* Box contains the Menu */}
          <Box>
            {signedIn ? (
              <>
                <Tooltip title="Account settings">
                  <Button
                    onClick={handleMenuClick}
                    variant="outlined"
                    // size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openMenu ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                  >
                    <Stack direction="row" alignItems="center" sx={{gap: 2}}>
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          textTransform: "capitalize",
                        }}
                      >
                        {user?.firstname[0]}
                      </Avatar>
                      <Typography
                        variant="h6"
                        color="#fff"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {user?.firstname} {user?.lastname}
                      </Typography>
                      {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    </Stack>
                  </Button>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleProfileClick} sx={{ gap: 2 }}>
                    <Avatar /> Your Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogOut} sx={{ gap: 2 }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  onClick={onOpenRegister}
                  sx={{ color: "#fff" }}
                >
                  {" "}
                  Register{" "}
                </Button>
                <Button
                  component={Link}
                  onClick={onOpenSignIn}
                  sx={{ color: "#fff" }}
                >
                  {" "}
                  Sign In{" "}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const HeaderBrandName = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: theme.palette.text.main,
  fontWeight: theme.typography.Bold,
  fontSize: "24px",
}));

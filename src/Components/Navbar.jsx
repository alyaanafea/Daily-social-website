import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function ResponsiveAppBar(props) {
  const navigate = useNavigate();
  const { user } = props;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{ background: "#330033", marginBottom: "30px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/home"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Daily
          </Typography>

          <Button
            component={Link}
            to="/post/add"
            sx={{
              my: 2,
              color: "white",
              display: "block",
              marginRight: "20px",
            }}
          >
            Add Post
          </Button>

          <Button
            component={Link}
            to="/home"
            sx={{
              my: 2,
              color: "white",
              display: "block",
              marginRight: "20px",
            }}
          >
            Home
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ mr: 1, color: "white" }}>
              {user.username}
            </Typography>
            <Tooltip title="User Profile">
              <Avatar alt="User" src={user.profilePic} />
            </Tooltip>
            <Button
              onClick={handleLogout}
              sx={{ color: "white", marginLeft: "40px" }}
            >
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext"; // Import the context

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access auth state and logout function

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_NAME}
          </Typography>

          {isAuthenticated ? (
            <>
              <Button
                component={NavLink}
                to="/dashboard"
                style={({ isActive }) => ({ backgroundColor: isActive ? "#6d1b7b" : "" })}
                sx={{ color: "white", textTransform: "none" }}
              >
                Dashboard
              </Button>
              <Button
                component={NavLink}
                to="/profile"
                style={({ isActive }) => ({ backgroundColor: isActive ? "#6d1b7b" : "" })}
                sx={{ color: "white", textTransform: "none" }}
              >
                Profile
              </Button>
              <Button
                onClick={() => {
                  logout(); // Logout and redirect to login
                  window.location.href = "/login";
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={NavLink}
                to="/login"
                style={({ isActive }) => ({ backgroundColor: isActive ? "#6d1b7b" : "" })}
                sx={{ color: "white", textTransform: "none" }}
              >
                Login Page
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

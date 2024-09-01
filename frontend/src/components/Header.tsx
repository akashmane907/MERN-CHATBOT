import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Logo from "../shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "../shared/NavigationLink";

function Header() {
  const auth = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        {/* Container for the logo, aligned to the left */}
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>

        {/* Navigation links, aligned to the right */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {auth.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Chat"
                textColor="black"
              />
              <NavigationLink
                bg="red"
                to="/"
                text="Logout"
                textColor="white"
                onClick={async () => {
                  await auth.logout();
                }}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#515385"
                to="/signup"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

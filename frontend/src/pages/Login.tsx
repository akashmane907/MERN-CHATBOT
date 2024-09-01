import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../shared/CustomizedInput";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-hot-toast"; // Correct import statement
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const auth = useAuth(); // Ensure you have this hook/context available

  // Correct the type and add async keyword
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In...", { id: "login" }); // Correct spelling of "Signing"
      await auth?.login(email, password); // Ensure auth.login is a valid function
      toast.success("Signed In Successfully", { id: "login" });
    } catch (err) {
      toast.error("Failed to Sign In", { id: "login" });
      console.error(err); // Use console.error for errors
    }

    console.log(email, password);
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }} // Adjust layout direction based on screen size
    >
      <Box
        padding={3}
        display={{ md: "flex", xs: "none" }}
        justifyContent="center"
        flex={1}
        alignItems="center"
      >
        <img
          src="robo-login.png"
          alt="robo"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
        padding={2}
        mt={{ xs: 4, md: 16 }} // Responsive margin top
        mx={{ xs: 2, md: 10 }} // Responsive horizontal margin
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "430px",
            margin: "auto",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              padding={2}
              fontWeight={500}
              gutterBottom
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "100%", // Full width within form container
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "#00cccc", // Change hover color as needed
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaSignInAlt style={{ marginRight: "8px" }} />
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

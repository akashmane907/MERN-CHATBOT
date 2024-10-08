import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for ReactDOM
import App from "./App";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // Correct import for Toaster
import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

// Create MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "white" },
  },
});

// Render the application
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}

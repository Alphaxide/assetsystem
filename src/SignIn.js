import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Card as MuiCard,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Import the local image
import SignInImage from "./assets/header.jpg"; // Background image
import Logo from "./assets/logo192.png"; // Your logo image

// Custom styled components
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

const SignInContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative", // To position the form correctly
  backgroundImage: `url(${SignInImage})`, // Set background image
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
}));

const LogoImage = styled("img")({
  maxWidth: "150px", // Set the max width of the logo
  marginBottom: "20px", // Add some margin below the logo
});

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://assetbackend-g82d.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Sign-in successful!");
        console.log("User Data:", data.user);
        setTimeout(() => navigate("/CreateAsset"), 1000); // Redirect after 1s
      } else {
        setMessage(data.message || "Sign-in failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <SignInContainer>
      <CssBaseline />
      <Grid container spacing={2} alignItems="center">
        {/* Right side: Sign-in form */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 4, mt: 5 }}>
            {/* Logo at the top */}
            <Box display="flex" justifyContent="center">
              <LogoImage src={Logo} alt="Logo" />
            </Box>
            <Typography variant="h4" gutterBottom textAlign="center">
              Sign In
            </Typography>
            {message && <Typography color="primary" textAlign="center">{message}</Typography>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                variant="outlined"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "black", color: "white" }}
              >
                Sign In
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }} textAlign="center">
              Don't have an account? <Button href="/signup">Sign up</Button>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </SignInContainer>
  );
}

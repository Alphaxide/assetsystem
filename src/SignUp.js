import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateInputs = () => {
    let newErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await fetch("https://assetbackend-g82d.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({ name: "", email: "", password: "", company_name: "", phone: "" });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="center">
      <CssBaseline />
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            label="Company Name"
            margin="normal"
            variant="outlined"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            variant="outlined"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I want to receive updates via email."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "black", color: "white" }}
          >
            Sign Up
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button fullWidth variant="outlined" startIcon={<Google />}>
          Sign up with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Button href="/signin">Sign in</Button>
        </Typography>
      </Card>
    </SignUpContainer>
  );
}

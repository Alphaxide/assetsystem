import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomAppBar from './CustomAppBar'; // Import CustomAppBar

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

const AssetContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function CreateAsset() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    gps_tracker_id: "",
    value: "",
    state: "Active",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Predefined categories list
  const categories = [
    "Laptops",
    "Vehicle",
    "Machinery",
    "Land",
    "Buildings",
  ];

  const validateInputs = () => {
    let newErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Asset Name is required.";
      valid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
      valid = false;
    }
    if (!formData.value || isNaN(parseFloat(formData.value))) {
      newErrors.value = "Valid asset value is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await fetch("https://assetbackend-g82d.onrender.com/createassets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Asset created successfully!");
        // Redirect to the confirmation page (without useHistory)
        window.location.href = "/confirm"; // Redirects to the /confirm page
      } else {
        setMessage(data.message || "Asset creation failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <>
      <CustomAppBar /> {/* Add CustomAppBar at the top */}

      <AssetContainer direction="column" justifyContent="center">
        <CssBaseline />
        <Card sx={{ p: 4, mt: 15 }}>
          <Typography variant="h4" gutterBottom>
            Create Asset
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Asset Name"
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
                error={!!errors.category}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography color="error" variant="body2">
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="GPS Tracker ID"
              margin="normal"
              variant="outlined"
              value={formData.gps_tracker_id}
              onChange={(e) => setFormData({ ...formData, gps_tracker_id: e.target.value })}
            />

            <TextField
              fullWidth
              label="Value"
              type="number"
              margin="normal"
              variant="outlined"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              error={!!errors.value}
              helperText={errors.value}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "black", color: "white" }}
            >
              Create Asset
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Card>
      </AssetContainer>
    </>
  );
}

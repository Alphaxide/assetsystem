import React, { useState, useEffect } from "react";
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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
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

export default function UpdateAsset() {
  const { id } = useParams(); // Get asset ID from URL
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

  useEffect(() => {
    // Fetch the asset data by ID (assuming the asset API endpoint)
    fetch(`https://assetbackend-g82d.onrender.com/api/assets/${id}`)
      .then(response => response.json())
      .then(data => setFormData({
        name: data.name, 
        category: data.category,
        gps_tracker_id: data.gps_tracker_id,
        value: data.value,
        state: data.state
      }))
      .catch(error => console.error("Error fetching asset data:", error));
  }, [id]);

  const validateInputs = () => {
    let newErrors = {};
    let valid = true;

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
      const response = await fetch(`https://assetbackend-g82d.onrender.com/api/assets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gps_tracker_id: formData.gps_tracker_id,
          value: formData.value,
          state: formData.state
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Asset updated successfully!");
        // Redirect to the updated asset details page
        window.location.href = `/asset/${id}`; // Redirect to the asset details page after update
      } else {
        setMessage(data.message || "Asset update failed.");
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
            Update Asset
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            
            {/* Asset Information Table */}
            <Table component={Paper} sx={{ marginBottom: 2 }}>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Name Field (Read-only) */}
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={formData.name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TableCell>
                </TableRow>

                {/* Category Field (Read-only) */}
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={formData.category}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TableCell>
                </TableRow>

                {/* GPS Tracker ID Field */}
                <TableRow>
                  <TableCell>GPS Tracker ID</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={formData.gps_tracker_id}
                      onChange={(e) => setFormData({ ...formData, gps_tracker_id: e.target.value })}
                    />
                  </TableCell>
                </TableRow>

                {/* Value Field */}
                <TableRow>
                  <TableCell>Value</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      error={!!errors.value}
                      helperText={errors.value}
                    />
                  </TableCell>
                </TableRow>

                {/* State Field */}
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "black", color: "white" }}
            >
              Update Asset
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Card>
      </AssetContainer>
    </>
  );
}

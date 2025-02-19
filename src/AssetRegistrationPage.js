import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddAssetPage = () => {
  const [assetName, setAssetName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSubmit = () => {
    // Handle form submission, potentially trigger API request to save asset
    console.log("Asset submitted:", { assetName, serialNumber, category, value, location });
    // Add payment process for tagging if needed
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Add New Asset
      </Typography>
      
      {/* Asset Name Input */}
      <TextField
        label="Asset Name"
        variant="outlined"
        fullWidth
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      {/* Serial Number Input */}
      <TextField
        label="Serial Number"
        variant="outlined"
        fullWidth
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      {/* Category Input */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Office Supplies">Office Supplies</MenuItem>
          <MenuItem value="Vehicles">Vehicles</MenuItem>
          {/* Add other categories here */}
        </Select>
      </FormControl>
      
      {/* Asset Value Input */}
      <TextField
        label="Asset Value"
        variant="outlined"
        fullWidth
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      {/* Location Input */}
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      {/* Request Tagging Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Request Tagging
      </Button>
    </Box>
  );
};

export default AddAssetPage;

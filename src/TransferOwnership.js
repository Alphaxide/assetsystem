import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import CustomAppBar from './CustomAppBar';

export default function TransferOwnership() {
  const { id } = useParams(); // Get asset id from the URL
  const [asset, setAsset] = useState(null);
  const [newOwnerId, setNewOwnerId] = useState(''); // For the user ID input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  // Fetch the asset details
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        setLoading(true);
        const assetResponse = await fetch(`https://assetbackend-g82d.onrender.com/assets/${id}`);
        const assetData = await assetResponse.json();
        
        if (assetResponse.ok) {
          setAsset(assetData);
        } else {
          setMessage("Failed to fetch asset data.");
        }
      } catch (error) {
        setMessage("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate that a user ID is provided
    if (!newOwnerId.trim()) {
      setErrors({ owner: "New owner ID is required." });
      return;
    }

    try {
      const response = await fetch(`https://assetbackend-g82d.onrender.com/assets/${id}/transfer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newOwnerId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Ownership transferred successfully!");
      } else {
        setMessage(data.message || "Transfer failed.");
      }
    } catch (error) {
      setMessage("Error transferring ownership.");
    }
  };

  return (
    <>
      <CustomAppBar />
      
      <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3, mt: 15 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
          Transfer Ownership
        </Typography>
        
        {loading ? (
          <CircularProgress />
        ) : asset ? (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Display asset info */}
            <Typography variant="h6">Asset: {asset.name}</Typography>
            <Typography variant="body1">Current Owner: {asset.owner_name}</Typography>

            {/* Input for new owner ID */}
            <TextField
              fullWidth
              label="New Owner ID"
              variant="outlined"
              value={newOwnerId}
              onChange={(e) => setNewOwnerId(e.target.value)}
              error={!!errors.owner}
              helperText={errors.owner}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "black", color: "white" }}
            >
              Transfer Ownership
            </Button>
          </Box>
        ) : (
          <Typography variant="h6" color="error">No asset found.</Typography>
        )}

        {message && <Typography color="primary" sx={{ mt: 3 }}>{message}</Typography>}
      </Box>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Using useNavigate
import axios from 'axios';
import AssetInfoSection from './AssetInfoSection';
import LocationTracking from './LocationTracking';
import CustomAppBar from './CustomAppBar'; // Import the dashboard navigation bar

const AssetDetailsPage = () => {
  const { id } = useParams(); // Get asset ID from URL
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [asset, setAsset] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch Asset Details
    axios.get(`https://assetbackend-g82d.onrender.com/api/assets/${id}`)
      .then(response => setAsset(response.data))
      .catch(error => console.error('Error fetching asset details:', error));

    // Fetch Asset Activity Log
    axios.get(`https://assetbackend-g82d.onrender.com/api/assets/${id}/activity`)
      .then(response => setActivityLog(response.data))
      .catch(error => console.error('Error fetching asset activity:', error));
  }, [id]);

  if (!asset) {
    return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 3 }}>Loading...</Typography>;
  }

  // Handle Update button click
  const handleUpdate = () => {
    navigate(`/Updates/${id}`); // Use navigate for updating the asset
  };

  // Handle Transfer Ownership button click
  const handleTransferOwnership = () => {
    navigate(`/transfer/${id}`); // Use navigate for transferring ownership
  };

  return (
    <>
      {/* Dashboard Navigation Bar */}
      <CustomAppBar />

      <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3, mt: 15 }}>
        <Typography variant="h4" sx={{color: '#016067', textAlign: 'center', marginBottom: 3 }}>
          Asset Details
        </Typography>

        {/* Display Asset Details */}
        <AssetInfoSection asset={asset} />

        {/* Location Tracking */}
        <LocationTracking assetId={id} />

        {/* Asset Activity Log */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" sx={{ color: '#016067', marginBottom: 2 }}>
            Asset Activity Log
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Activity</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityLog.length > 0 ? (
                  activityLog.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.activity}</TableCell>
                      <TableCell>{log.location || 'N/A'}</TableCell>
                      <TableCell 
                        sx={{ 
                          color: log.status === 'Active' ? 'green' : 
                                 log.status === 'Inactive' ? 'red' : 
                                 'black',
                          fontWeight: 'bold' 
                        }}
                      >
                        {log.status}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No activity found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ marginRight: 2 }}
          >
            Update
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleTransferOwnership}
          >
            Transfer Ownership
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssetDetailsPage;

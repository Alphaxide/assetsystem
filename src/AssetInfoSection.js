import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const AssetInfoSection = ({ asset }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 3, backgroundColor: '#ffffff' }}>
      <Typography variant="h5" sx={{ marginBottom: 2, color: '#0C234C', fontWeight: 'bold' }}>
        Asset Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Serial Number:</strong> {asset?.serial_number || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Name:</strong> {asset?.name || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Category:</strong> {asset?.category || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Value:</strong> {asset?.value   || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>State:</strong> {asset?.state || 'N/A'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetInfoSection;

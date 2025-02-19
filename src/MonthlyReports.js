import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import jsPDF from 'jspdf';

const MonthlyReports = () => {
  // Dummy Data
  const assetData = [
    { name: 'Laptop', category: 'Electronics', value: 50000, location: 'Nairobi HQ' },
    { name: 'Office Chair', category: 'Furniture', value: 15000, location: 'Mombasa' },
    { name: 'Projector', category: 'Electronics', value: 30000, location: 'Kisumu' },
  ];

  const locationData = [
    { location: 'Nairobi HQ', count: 3 },
    { location: 'Mombasa', count: 2 },
    { location: 'Kisumu', count: 1 },
  ];

  // Generate Asset Summary Report (PDF)
  const generateAssetSummaryPDF = () => {
    const doc = new jsPDF();
    doc.text('Asset Summary Report', 10, 10);

    assetData.forEach((asset, index) => {
      doc.text(`${asset.name} - ${asset.category} - KES ${asset.value} - ${asset.location}`, 10, 20 + index * 10);
    });

    doc.save('asset_summary_report.pdf');
  };

  // Generate Location Report (PDF)
  const generateLocationReportPDF = () => {
    const doc = new jsPDF();
    doc.text('Location Report', 10, 10);

    locationData.forEach((location, index) => {
      doc.text(`${location.location}: ${location.count} assets`, 10, 20 + index * 10);
    });

    doc.save('location_report.pdf');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>Monthly Reports</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={generateAssetSummaryPDF} fullWidth>
            Download Asset Summary Report
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="secondary" onClick={generateLocationReportPDF} fullWidth>
            Download Location Report
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyReports;

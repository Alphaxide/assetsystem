import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import MonthlyReports from './MonthlyReports';
import Notifications from './Notifications';

const ReportsNotificationsPage = () => {
  return (
    <Container>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
          Reports & Notifications
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MonthlyReports />
          </Grid>

          <Grid item xs={12} md={6}>
            <Notifications />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ReportsNotificationsPage;

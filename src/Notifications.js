import React, { useState } from 'react';
import { Box, Snackbar, Alert, Typography } from '@mui/material';
import { Button } from '@mui/material';


const Notifications = () => {
  // Dummy notification data
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const triggerPaymentAlert = () => {
    setNotification('Payment for asset tagging was successful!');
    setOpen(true);
  };

  const triggerAssetStateChangeAlert = () => {
    setNotification('Asset state changed: Projector is now Damaged.');
    setOpen(true);
  };

  // Handle close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>Notifications</Typography>

      {/* Notifications Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={triggerPaymentAlert}>Payment Alert</Button>
        <Button variant="outlined" onClick={triggerAssetStateChangeAlert}>Asset State Change</Button>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notifications;

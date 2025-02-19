// OwnershipTransfer.js
import React from 'react';
import { Box, Button } from '@mui/material';

const OwnershipTransfer = ({ onTransferClick }) => {
  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Button variant="contained" color="primary" onClick={onTransferClick}>
        Transfer Ownership
      </Button>
    </Box>
  );
};

export default OwnershipTransfer;

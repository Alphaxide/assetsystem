import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, FormControl, InputLabel, Select, Grid, TextField } from '@mui/material';
import PaymentGateway from './PaymentGateway';  // Payment Gateway component
import TransactionHistory from './TransactionHistory';  // Transaction History component

const PaymentPage = () => {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const assets = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Office Chair' },
    { id: 3, name: 'Projector' },
    // Add more assets here
  ];

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  const handleTransactionSuccess = () => {
    setTransactionSuccess(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Payment & Transactions
      </Typography>
      
      {/* Payment Gateway Section */}
      <PaymentGateway
        asset={selectedAsset}
        onTransactionSuccess={handleTransactionSuccess}
      />
      
      {/* Transaction History Section */}
      <TransactionHistory />
    </Box>
  );
};

export default PaymentPage;

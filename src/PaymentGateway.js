import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PaymentGateway = ({ asset, onTransactionSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    // Simulate payment process (You can integrate actual payment gateway here)
    setIsPaid(true);
    onTransactionSuccess();
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Payment Gateway</Typography>
      
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Asset for Tagging</InputLabel>
        <Select
          value={asset}
          onChange={(e) => {}}
        >
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Office Chair">Office Chair</MenuItem>
          <MenuItem value="Projector">Projector</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Amount: KES 50
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <MenuItem value="mpesa">M-Pesa</MenuItem>
          <MenuItem value="stripe">Stripe</MenuItem>
        </Select>
      </FormControl>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={isPaid}
        sx={{ width: '100%' }}
      >
        {isPaid ? 'Payment Successful' : 'Pay Now'}
      </Button>
      
      {isPaid && (
        <Typography variant="body1" sx={{ marginTop: 2, color: 'green' }}>
          Payment Confirmed. Your asset has been tagged.
        </Typography>
      )}
    </Box>
  );
};

export default PaymentGateway;

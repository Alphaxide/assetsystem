import * as React from 'react';
import { Box, Button, FormControl, FormLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function RegistrationForm() {
  // State hooks for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Registered!\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\nCompany: ${companyName || 'N/A'}\nAddress: ${address}`);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Registration Form
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor="firstName" required>First Name</FormLabel>
              <OutlinedInput
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                sx={{
                  borderRadius: 2, 
                  backgroundColor: 'white', 
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="lastName" required>Last Name</FormLabel>
              <OutlinedInput
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                sx={{
                  borderRadius: 2, 
                  backgroundColor: 'white', 
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
              />
            </FormControl>
          </Box>

          <FormControl fullWidth>
            <FormLabel htmlFor="email" required>Email</FormLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              sx={{
                borderRadius: 2, 
                backgroundColor: 'white', 
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="phone" required>Phone Number</FormLabel>
            <OutlinedInput
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
              sx={{
                borderRadius: 2, 
                backgroundColor: 'white', 
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="company" optional>Company Name (Optional)</FormLabel>
            <OutlinedInput
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name (Optional)"
              sx={{
                borderRadius: 2, 
                backgroundColor: 'white', 
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="address" required>Address</FormLabel>
            <OutlinedInput
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              sx={{
                borderRadius: 2, 
                backgroundColor: 'white', 
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ borderRadius: 2, textTransform: 'capitalize' }}>
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import CustomAppBar from './CustomAppBar';

import headerImage from './assets/header.jpg';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <>
      <CustomAppBar />

      <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 3, marginTop: 15 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}></Typography>

        <Box 
                            sx={{
                              backgroundImage: `url(${headerImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: 1,
                              padding: 4,
                              color: 'white',
                              boxShadow: 2,
                              marginBottom: 3
                            }}
                          >
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                              Welcome to Transaction Page
                            </Typography>
                            <Typography variant="body1">
                              Here you can see an overview of your transctions.
                            </Typography>
                          </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#016067', fontWeight: 'bold', }}>Transaction ID</TableCell>
                  <TableCell align="center" sx={{ color: '#016067', fontWeight: 'bold', }}>Amount (KES)</TableCell>
                  <TableCell align="center" sx={{ color: '#016067', fontWeight: 'bold', }}>Status</TableCell>
                  <TableCell align="center" sx={{ color: '#016067', fontWeight: 'bold', }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(txn => (
                  <TableRow key={txn.id} style={{ cursor: 'pointer' }}>
                    <TableCell align="center">{txn.id}</TableCell>
                    <TableCell align="center">{Number(txn.amount).toFixed(2)}</TableCell>
                    <TableCell align="center" style={{ color: txn.payment_status === 'Paid' ? 'green' : 'red' }}>
                      {txn.payment_status}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" sx={{backgroundColor: "#016067"}} onClick={() => navigate(`/transaction/${txn.id}`)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default TransactionHistory;
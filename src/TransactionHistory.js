import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import CustomAppBar from './CustomAppBar';

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
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Transaction History</Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Transaction ID</TableCell>
                  <TableCell align="center">Amount (KES)</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Details</TableCell>
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
                      <Button variant="contained" color="primary" onClick={() => navigate(`/transaction/${txn.id}`)}>
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
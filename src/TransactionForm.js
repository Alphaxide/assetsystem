import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleDownloadInvoice = (id) => {
    axios.get(`https://assetbackend-g82d.onrender.com/invoice/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.error('Error downloading invoice:', error));
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Transaction History
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Transaction ID</TableCell>
                <TableCell align="center">Amount (KES)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(txn => (
                <TableRow key={txn.id}>
                  <TableCell align="center">{txn.id}</TableCell>
                  <TableCell align="center">{txn.amount.toFixed(2)}</TableCell>
                  <TableCell align="center" style={{ color: txn.payment_status === 'Paid' ? 'green' : 'red' }}>
                    {txn.payment_status}
                  </TableCell>
                  <TableCell align="center">
                    {txn.payment_status === 'Paid' && (
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDownloadInvoice(txn.id)}
                      >
                        Download
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TransactionHistory;

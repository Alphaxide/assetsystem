import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CustomAppBar from './CustomAppBar'; // Import Navbar

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://assetbackend-g82d.onrender.com/transactiondetails/${id}`)
      .then(response => {
        setTransaction(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching transaction details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDownloadInvoice = () => {
    const invoiceElement = document.getElementById('invoice-content');

    html2canvas(invoiceElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`invoice_${id}.pdf`);
    });
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 3 }} />;

  return (
    <Box>
      {/* Navigation Bar */}
      <CustomAppBar />

      <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#016067',marginBottom: 3, marginTop: '120px', fontWeight: 'bold' }}>
          Transaction Details
        </Typography>

        <Paper sx={{ padding: 3, textAlign: 'left' }} id="invoice-content">
          {/* Transaction Details Table */}
          <TableContainer>
            <Table sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', paddingBottom: '12px' }}>Transaction ID</TableCell>
                  <TableCell>{transaction.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', paddingBottom: '12px' }}>Amount</TableCell>
                  <TableCell>KES {Number(transaction.amount).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', paddingBottom: '12px' }}>Status</TableCell>
                  <TableCell>{transaction.payment_status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', paddingBottom: '12px' }}>Created At</TableCell>
                  <TableCell>{new Date(transaction.created_at).toLocaleString()}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <Typography sx={{ marginTop: 3, fontWeight: 'bold' }}>Asset Details:</Typography>

          {/* Asset Details Table */}
          <TableContainer>
            <Table sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Asset Name</TableCell>
                  <TableCell>{transaction.asset_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Serial Number</TableCell>
                  <TableCell>{transaction.serial_number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Owner ID</TableCell>
                  <TableCell>{transaction.owner_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>GPS Tracker ID</TableCell>
                  <TableCell>{transaction.gps_tracker_id || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                  <TableCell>KES {Number(transaction.asset_value).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>State</TableCell>
                  <TableCell>{transaction.asset_state}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Button 
          variant="contained" 
          color="secondary" 
          sx={{backgroundColor: '#016067', marginTop: 3 }} 
          onClick={handleDownloadInvoice}
        >
          Download Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionDetails;

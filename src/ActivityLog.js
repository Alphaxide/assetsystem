import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const AssetActivityTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/asset-activities')
      .then(response => setRows(response.data))
      .catch(error => console.error('Error fetching asset activities:', error));
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
        Asset Activity Log
      </Typography>
      <TableContainer>
        <Table aria-label="asset activity table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date & Time</TableCell>
              <TableCell align="center">Activity</TableCell>
              <TableCell align="center">Asset Name</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.dateTime}</TableCell>
                  <TableCell align="center">{row.activity}</TableCell>
                  <TableCell align="center">{row.assetName}</TableCell>
                  <TableCell align="center">{row.location || '-'}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No activity found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AssetActivityTable;

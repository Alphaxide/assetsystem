import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoricalTrackingTable = ({ startDate, endDate }) => {
  // Dummy data for asset movement
  const movements = [
    {
      dateTime: '2025-02-13 14:30:45',
      assetName: 'Laptop',
      movement: 'Moved to Nairobi CBD',
      status: 'Active',
    },
    {
      dateTime: '2025-02-12 10:15:20',
      assetName: 'Office Chair',
      movement: 'Transferred to Kisumu',
      status: 'Completed',
    },
    {
      dateTime: '2025-02-11 08:50:10',
      assetName: 'Projector',
      movement: 'Damaged in Mombasa',
      status: 'Damaged',
    },
    // Add more movement logs
  ];

  const filteredMovements = movements.filter((movement) => {
    const movementDate = new Date(movement.dateTime);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    return movementDate >= start && movementDate <= end;
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table aria-label="historical asset movements">
        <TableHead>
          <TableRow>
            <TableCell>Date & Time</TableCell>
            <TableCell>Asset Name</TableCell>
            <TableCell>Movement</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMovements.map((movement, index) => (
            <TableRow key={index}>
              <TableCell>{movement.dateTime}</TableCell>
              <TableCell>{movement.assetName}</TableCell>
              <TableCell>{movement.movement}</TableCell>
              <TableCell>{movement.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoricalTrackingTable;

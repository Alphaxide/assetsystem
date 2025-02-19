// AssetTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AssetTable = ({ assets, searchQuery }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('assetName');

  // Sorting function
  const handleSort = (column) => {
    const isAsc = sortBy === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(column);
  };

  // Sorting the assets based on column and direction
  const sortedAssets = assets
    .filter((asset) =>
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table aria-label="asset list table">
          <TableHead>
            <TableRow>
              {['assetName', 'serialNumber', 'category', 'state', 'value', 'location'].map((column) => (
                <TableCell
                  key={column}
                  align="center"
                  onClick={() => handleSort(column)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortBy === column && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAssets.map((asset, index) => (
              <TableRow key={index}>
                <TableCell align="center">{asset.assetName}</TableCell>
                <TableCell align="center">{asset.serialNumber}</TableCell>
                <TableCell align="center">{asset.category}</TableCell>
                <TableCell align="center">{asset.state}</TableCell>
                <TableCell align="center">{asset.value}</TableCell>
                <TableCell align="center">{asset.location}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AssetTable;

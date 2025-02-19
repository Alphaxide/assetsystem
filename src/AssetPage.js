import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssetSearchFilter from './AssetSearchFilter'; // Import the filter component
import CustomAppBar from './CustomAppBar'; // Import the navigation bar

const AssetListView = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ serialNumber: '', category: '', state: '' });
  const [filterOptions, setFilterOptions] = useState({ serialNumbers: [], categories: [], states: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/assets')
      .then(response => {
        setAssets(response.data);
        setFilteredAssets(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));

    axios.get('https://assetbackend-g82d.onrender.com/assets/filters')
      .then(response => setFilterOptions(response.data))
      .catch(error => console.error('Error fetching filter options:', error));
  }, []);

  useEffect(() => {
    let filtered = assets.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.serialNumber ? asset.serial_number === filters.serialNumber : true) &&
      (filters.category ? asset.category === filters.category : true) &&
      (filters.state ? asset.state === filters.state : true)
    );

    setFilteredAssets(filtered);
  }, [searchQuery, filters, assets]);

  const handleRowClick = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <>
      {/* Navigation Bar */}
      <CustomAppBar />

      {/* Asset List Content */}
      <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3, mt: 15 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Asset List View
        </Typography>

        {/* Use the Search & Filter Component */}
        <AssetSearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
        />

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table aria-label="asset list table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Asset Name</TableCell>
                  <TableCell align="center">Serial Number</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAssets.map(asset => (
                  <TableRow 
                    key={asset.id} 
                    hover
                    onClick={() => handleRowClick(asset.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{asset.name}</TableCell>
                    <TableCell align="center">{asset.serial_number}</TableCell>
                    <TableCell align="center">{asset.category}</TableCell>
                    <TableCell align="center">{asset.state}</TableCell>
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

export default AssetListView;

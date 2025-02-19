// AssetListView.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AssetSearch from './SearchIcon';
import AssetTable from './AssetTable';

const AssetListView = () => {
  // Dummy data for assets
  const assetRows = [
    { assetName: 'Laptop', serialNumber: 'SN001', category: 'Electronics', state: 'Operational', value: '$1000', location: 'Nairobi CBD' },
    { assetName: 'Office Chair', serialNumber: 'SN002', category: 'Furniture', state: 'Damaged', value: '$150', location: 'Mombasa' },
    { assetName: 'Printer', serialNumber: 'SN003', category: 'Electronics', state: 'Operational', value: '$300', location: 'Nairobi HQ' },
    { assetName: 'Projector', serialNumber: 'SN004', category: 'Electronics', state: 'Damaged', value: '$800', location: 'Kisumu' },
    { assetName: 'Server Rack', serialNumber: 'SN005', category: 'Hardware', state: 'Operational', value: '$2500', location: 'Nairobi HQ' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // This function could be used to trigger additional search logic if necessary
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Asset List View
      </Typography>

      {/* Search Section */}
      <AssetSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      {/* Table Section */}
      <AssetTable assets={assetRows} searchQuery={searchQuery} />
    </Box>
  );
};

export default AssetListView;

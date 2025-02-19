import React from 'react';
import { Box, TextField, Select, MenuItem, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AssetSearchFilter = ({ searchQuery, setSearchQuery, filters, setFilters, filterOptions }) => {
  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle dropdown change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      {/* Search Field with Semi-Circular Border */}
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          width: '40%',
          borderRadius: '50px', // Semi-circular border for the search field
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px', // Apply the semi-circular border to the input
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Serial Number Dropdown */}
      <Select
        name="serialNumber"
        value={filters.serialNumber}
        onChange={handleFilterChange}
        displayEmpty
        size="small"
        sx={{
          width: '15%',
          borderRadius: '50px', // Semi-circular border for the search field
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px', // Apply the semi-circular border to the input
          },
        }}
      >
        <MenuItem value="">All Serial Numbers</MenuItem>
        {filterOptions.serialNumbers.map(sn => (
          <MenuItem key={sn} value={sn}>{sn}</MenuItem>
        ))}
      </Select>

      {/* Category Dropdown */}
      <Select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        displayEmpty
        size="small"
        sx={{
          width: '15%',
          borderRadius: '50px', // Semi-circular border for the search field
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px', // Apply the semi-circular border to the input
          },
        }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {filterOptions.categories.map(cat => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </Select>

      {/* State Dropdown */}
      <Select
        name="state"
        value={filters.state}
        onChange={handleFilterChange}
        displayEmpty
        size="small"
        sx={{
          width: '15%',
          borderRadius: '50px', // Semi-circular border for the search field
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px', // Apply the semi-circular border to the input
          },
        }}
      >
        <MenuItem value="">All States</MenuItem>
        {filterOptions.states.map(st => (
          <MenuItem key={st} value={st}>{st}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AssetSearchFilter;

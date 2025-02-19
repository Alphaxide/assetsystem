// AssetSearch.js
import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AssetSearch = ({ searchQuery, onSearchChange, onSearch }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      <TextField
        label="Search by Name or Serial Number"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={onSearchChange}
        sx={{ width: '60%' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AssetSearch;

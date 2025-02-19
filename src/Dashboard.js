import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { AccountBalance, Storage, TrendingUp } from '@mui/icons-material';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // Import Recharts for Pie Chart

// InfoCard Component
const InfoCard = ({ title, icon, value, small }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        boxShadow: 2,
        borderRadius: 1,
        height: small ? 100 : 140,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'lowercase', fontWeight: '500' }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </Box>
    </Box>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState({
    totalAssets: 0,
    categoriesCount: 0,
    totalAssetNetWorth: '0',
    categories: [],
  });

 
  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/dashboard')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Pie chart data for asset categories
  

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Assets Card */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Total Assets"
            value={data.totalAssets}
            icon={<AccountBalance sx={{ fontSize: 40, color: '#ff5722' }} />}
          />
        </Grid>

        {/* Total Asset Net Worth Card */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Total Asset Net Worth"
            value={`Sh ${data.totalAssetNetWorth}`}
            icon={<Storage sx={{ fontSize: 40, color: '#3f51b5' }} />}
          />
        </Grid>

        {/* Categories Count */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Asset Categories"
            value={data.categoriesCount}
            icon={<TrendingUp sx={{ fontSize: 40, color: '#4caf50' }} />}
          />
        </Grid>
      </Grid>

      {/* Asset Categories Pie Chart */}


      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Assets by Category
        </Typography>

        {/* Smaller Category Cards */}
        <Grid container spacing={2}>
          {data.categories.map((category, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <InfoCard
                title={category.name}
                value={`${category.assetCount} assets`}
                small // Smaller card
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;

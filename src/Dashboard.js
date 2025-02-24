import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountBalance, Storage, TrendingUp, Category } from '@mui/icons-material';
import axios from 'axios';
import headerImage from './assets/header.jpg'; // Background image for the dashboard header

// MainCard Component: For dashboard main cards
const MainCard = ({ title, value, icon, bgColor, iconColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        height: 90,
        backgroundColor: bgColor || 'white', // Default white background color
        color:  'black', // Icon color (and text color)
        boxShadow: 0, // Apply box shadow for main cards
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'lowercase' }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </Box>
    </Box>
  );
};

// CategoryCard Component: For asset categories
const CategoryCard = ({ title, value, icon, bgColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        height: 80,
        backgroundColor: bgColor || '#01A8B4', // Custom background color for categories
        color: 'white', // Text color white for category cards
        boxShadow: 'none', // Remove box shadow for category cards
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'lowercase' }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        
      </Typography>

      {/* This Box has the background image applied */}
      <Box 
        sx={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 1,
          padding: 4,
          color: 'white',
          boxShadow: 2,
          marginBottom: 3
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1">
          Here you can see an overview of your assets and categories.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Total Assets Card */}
        <Grid item xs={12} sm={4}>
          <MainCard
            title="Total Assets"
            value={data.totalAssets}
            icon={<AccountBalance sx={{ fontSize: 40, color: '#ff5722' }} />}
            bgColor="white"
            iconColor="#ff5722"
          />
        </Grid>

        {/* Total Asset Net Worth Card */}
        <Grid item xs={12} sm={4}>
          <MainCard
            title="Total Asset Net Worth"
            value={`Sh ${data.totalAssetNetWorth}`}
            icon={<Storage sx={{ fontSize: 40, color: '#3f51b5' }} />}
            bgColor="white"
            iconColor="#3f51b5"
          />
        </Grid>

        {/* Categories Count Card */}
        <Grid item xs={12} sm={4}>
          <MainCard
            title="Asset Categories"
            value={data.categoriesCount}
            icon={<TrendingUp sx={{ fontSize: 40, color: '#01A8B4' }} />}
            bgColor="white"
            iconColor="#01A8B4"
          />
        </Grid>

        {/* Asset Categories Section (New Card for Asset Categories) */}

      </Grid>

      {/* Asset Categories Section */}
      <Box sx={{ marginTop: 3, backgroundColor: '#01A8B4', padding: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, color: 'white' }}>
          Assets by Category
        </Typography>

        <Grid container spacing={2}>
          {data.categories.map((category, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <CategoryCard
                title={category.name}
                value={`${category.assetCount} assets`}
                bgColor="#01A8B4" // Set background color for category cards
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [percentages, setPercentages] = useState([]);
  const colors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#216869']; // Color scheme

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/asset-distribution')
      .then(response => {
        const { labels, data, percentages } = response.data;

        setChartData({
          labels,
          datasets: [
            {
              label: 'Assets',
              data,
              backgroundColor: colors.slice(0, labels.length),
              hoverBackgroundColor: colors.map(color => color + 'AA') // Slightly faded hover effect
            }
          ]
        });

        setPercentages(percentages);
      })
      .catch(error => console.error('Error fetching asset data:', error));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium+
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '700px',
        margin: '0 auto',
        gap: 2 // Adds spacing between chart and table
      }}
    >
      {/* Pie Chart */}
      <Box sx={{ width: '300px' }}>
        <h3>Asset Categories Distribution</h3>
        <Pie data={chartData} />
      </Box>

      {/* Key Table with Colors & Percentages */}
      <TableContainer component={Paper} sx={{ maxWidth: 350, marginTop: { xs: 2, md: 0 } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Percentage (%)</TableCell>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.labels.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category}</TableCell>
                <TableCell align="right">{percentages[index] || '0.00'}%</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: colors[index],
                      borderRadius: '4px'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PieChart;

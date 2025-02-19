import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import datalabel plugin

// Register components required by Chart.js and datalabel plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => {
  // Dummy data for categories and values in Ksh
  const data = {
    labels: ['Cars', 'Trucks', 'Buildings'], // Categories
    datasets: [
      {
        label: 'Value in Ksh',
        data: [1200000, 800000, 1500000], // Values corresponding to each category (in Ksh)
        backgroundColor: '#36a2eb', // Bar color
        borderColor: '#36a2eb', // Border color
        borderWidth: 1, // Thin border
        barThickness: 15, // Adjust bar thickness
        borderSkipped: 'top', // Remove internal lines
        hoverBackgroundColor: '#007bff', // Hover effect
      },
    ],
  };

  // Function to format numbers in short form like 100k, 1m
  const formatNumber = (value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'm';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    } else {
      return value;
    }
  };

  // Options to configure the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Convert Ksh value to a string with commas for readability
            return context.dataset.label + ': ' + formatNumber(context.raw);
          },
        },
      },
      // Data labels configuration to display values above or below bars
      datalabels: {
        color: 'black',
        align: 'center',
        anchor: 'end',
        font: {
          weight: 'bold',
        },
        formatter: (value) => formatNumber(value), // Format data labels
        offset: 10, // Adjust position of the label (above or below bar)
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove X-axis grid lines
        },
        ticks: {
          display: true, // Show labels for each bar (asset names)
        },
      },
      y: {
        beginAtZero: true, // Start the Y-axis at zero
        ticks: {
          display: false, // Hide Y-axis ticks (horizontal values)
        },
        grid: {
          display: false, // Remove Y-axis grid lines
        },
      },
    },
    layout: {
      padding: {
        top: 20, // Add some space on top of the chart
      },
    },
  };

  return (
    <Box sx={{ width: '100%', padding: '5px' }}>
      <Typography variant="h6" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Asset Value Distribution (in Ksh)
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '80%', height: 400 }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default BarChart;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { TextField, Box, Typography, CircularProgress } from '@mui/material';
import CustomAppBar from './CustomAppBar'; // Import CustomAppBar component

import headerImage from './assets/header.jpg';

// Custom Map Icon
const customIcon = new Icon({
  iconUrl: require('./images/location.png'),
  iconSize: [32, 32], // Adjust icon size
});

const AssetTracker = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Fetch asset locations from the backend API
  useEffect(() => {
    setLoading(true);
    axios.get('https://assetbackend-g82d.onrender.com/assets-locations')
      .then(response => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setLoading(false);
      });
  }, []);

  // Filter the assets based on the search term
  const filteredAssets = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to center the map on the selected asset
  const MapUpdater = ({ position }) => {
    const map = useMap();
    if (position) {
      map.setView(position, 10); // Zoom to level 10
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* Custom AppBar */}
      <CustomAppBar />

      <Typography variant="h5" sx={{ marginBottom: 2, mt:15 }}>
        
      </Typography>
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
                        Welcome to Asset Tracking Page
                      </Typography>
                      <Typography variant="body1">
                        Here you can see an overview of your assets and search.
                      </Typography>
                    </Box>

      {/* Search Bar */}
      <TextField
  label="Search Assets"
  variant="outlined"
  fullWidth
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    borderRadius: '50px', // Creates semicircular borders
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px', // Ensures the input has semicircular corners
    },
  }}
  style={{ marginBottom: '16px' }} // Add space below the search bar
/>


      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* Asset Map */}
      {!loading && (
        <MapContainer
          center={[-1.286389, 36.817223]} // Nairobi, Kenya
          zoom={6}
          style={{ width: '100%', height: '500px' }}
          minZoom={5}
          maxZoom={10}
        >
          {/* Grey Map Style */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />

          {/* MapUpdater component to center map on selected asset */}
          <MapUpdater position={selectedAsset ? [selectedAsset.lat, selectedAsset.lon] : null} />

          {/* Dynamic Asset Markers */}
          {filteredAssets.map(location => (
            <Marker
              key={location.id}
              position={[location.lat, location.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => setSelectedAsset(location), // When the marker is clicked
              }}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Asset List (Optional) */}
      {filteredAssets.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Matching Assets:</Typography>
          <ul>
            {filteredAssets.map(location => (
              <li key={location.id} onClick={() => setSelectedAsset(location)}>
                {location.name}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default AssetTracker;

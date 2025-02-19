import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Custom Map Icon
const customIcon = new Icon({
  iconUrl: require('./images/location.png'),
  iconSize: [32, 32], // Adjust icon size
});

const HomePageMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('https://assetbackend-g82d.onrender.com/assets-locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <MapContainer
      center={[-1.286389, 36.817223]} // Nairobi, Kenya
      zoom={6}
      style={{ width: '100%', height: '500px', margin: '0 auto' }}
      minZoom={5}
      maxZoom={10}
    >
      {/* Grey Map Style */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />

      {/* Dynamic Asset Markers */}
      {locations.map(location => (
        <Marker key={location.id} position={[location.lat, location.lon]} icon={customIcon}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HomePageMap;

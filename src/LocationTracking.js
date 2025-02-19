import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationTracking = ({ assetId }) => {
    const [assetLocation, setAssetLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGPSData = async () => {
            try {
                const response = await axios.get(`https://assetbackend-g82d.onrender.com/gps-data?asset_id=${assetId}`);
                const gpsRecords = response.data;

                if (gpsRecords.length > 0) {
                    setAssetLocation(gpsRecords[0]); // Assume the first record is the latest
                } else {
                    setAssetLocation({
                        latitude: -1.286389,
                        longitude: 36.817223,
                        timestamp: "Unknown"
                    });
                }
            } catch (err) {
                setError("Failed to load GPS data");
                setAssetLocation({
                    latitude: -1.286389,
                    longitude: 36.817223,
                    timestamp: "Unknown"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGPSData();
    }, [assetId]);

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, marginBottom: 3 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Location Tracking
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Asset ID:</strong> {assetId} <br />
                        <strong>Timestamp:</strong> {assetLocation.timestamp}
                    </Typography>

                    <MapContainer
                        center={[assetLocation.latitude, assetLocation.longitude]}
                        zoom={12}
                        style={{ width: '100%', height: '400px', borderRadius: 2 }}
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
                        <Marker
                            position={[assetLocation.latitude, assetLocation.longitude]}
                            icon={new Icon({
                                iconUrl: require('./images/location.png'),
                                iconSize: [32, 32],
                            })}
                        >
                            <Popup>Asset Location (ID: {assetId})</Popup>
                        </Marker>
                    </MapContainer>
                </>
            )}
        </Box>
    );
};

export default LocationTracking;

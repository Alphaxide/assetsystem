import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import CustomAppBar from './CustomAppBar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationIcon from './images/location.png';
import axios from 'axios';

const InfoCard = ({ title, value }) => (
  <Paper sx={{ padding: 1.5, boxShadow: 0, borderRadius: 1, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'lowercase', fontWeight: '500', textAlign: 'left' }}>
      {title}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'left' }}>
      {value}
    </Typography>
  </Paper>
);

const EventDashboard = () => {
    const [data, setData] = useState({
      eventName: 'Annual Tech Conference',
      eventDate: '2025-03-15',
      venue: 'Uhuru Park',
    totalTicketsSold: 6000,
    checkedInAttendees: 5000,
    liveTracking: 3000,
    attendanceBreakdown: [
      { name: 'Checked-In', value: 5000 },
      { name: 'Not Checked-In', value: 1000 }
    ],
    checkInDistribution: [
      { time: '08:00 AM', value: 800 },
      { time: '09:00 AM', value: 1200 },
      { time: '10:00 AM', value: 1000 },
      { time: '11:00 AM', value: 700 },
      { time: '12:00 PM', value: 1300 },
    ],
    locations: [
      { lat: -1.2921, lng: 36.8219 },
      { lat: -1.2925, lng: 36.8225 },
    ]
  });

  useEffect(() => {
    axios.get('http://localhost:5001/event-dashboard')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching event data:', error));
  }, []);

  const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [25, 25],
  });

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 20 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          event dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}><InfoCard title="Event Name" value={data.eventName} /></Grid>
          <Grid item xs={6} sm={4}><InfoCard title="Event Date" value={data.eventDate} /></Grid>
          <Grid item xs={6} sm={4}><InfoCard title="Venue" value={data.venue} /></Grid>
          <Grid item xs={6} sm={4}><InfoCard title="Total Tickets Sold" value={data.totalTicketsSold} /></Grid>
          <Grid item xs={6} sm={4}><InfoCard title="Checked-In Attendees" value={data.checkedInAttendees} /></Grid>
          <Grid item xs={6} sm={4}><InfoCard title="Live Tracking Users" value={data.liveTracking} /></Grid>
        </Grid>


        <Box sx={{ marginTop: 3, height: 400, marginBottom: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            live map tracking
          </Typography>
          <MapContainer center={[-1.2921, 36.8219]} zoom={15} style={{ height: '100%', width: '100%', background: '#808080' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.locations.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon} />
            ))}
          </MapContainer>
        </Box>

        <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              check-in time distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.checkInDistribution}>
                <XAxis dataKey="time" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" radius={[5, 5, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              attendance breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.attendanceBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  <Cell fill="#4caf50" name="Checked-In" />
                  <Cell fill="#f44336" name="Not Checked-In" />
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EventDashboard;

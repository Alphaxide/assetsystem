import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationIcon from './images/location.png';

import CustomAppBar from './CustomAppBar';

const customIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [25, 25],
});

const mockAttendees = [
  { id: 'TKT123', name: 'John Doe', email: 'john@example.com', location: [-1.2921, 36.8219], history: [[-1.2925, 36.8225], [-1.2930, 36.8230]] },
  { id: 'TKT456', name: 'Jane Smith', email: 'jane@example.com', location: [-1.2900, 36.8200], history: [[-1.2905, 36.8210], [-1.2910, 36.8220]] },
];

const AttendeeSearchTracking = () => {
  const [search, setSearch] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredAttendees = mockAttendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(search.toLowerCase()) ||
    attendee.id.toLowerCase().includes(search.toLowerCase()) ||
    attendee.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
         <CustomAppBar />
      <Typography variant="h4" sx={{ marginBottom: 3 , mt: 20}}>
        Attendee Search & Tracking
      </Typography>
      <TextField
        label="Search by Name, Ticket ID, or Email"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <Paper sx={{ maxHeight: 200, overflow: 'auto', marginBottom: 3 }}>
        <List>
          {filteredAttendees.map((attendee) => (
            <ListItem button key={attendee.id} onClick={() => setSelectedAttendee(attendee)}>
              <ListItemText primary={attendee.name} secondary={`Ticket ID: ${attendee.id}, Email: ${attendee.email}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selectedAttendee && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Live Location - {selectedAttendee.name}
          </Typography>
          <MapContainer center={selectedAttendee.location} zoom={15} style={{ height: 300, width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={selectedAttendee.location} icon={customIcon} />
            <Polyline positions={selectedAttendee.history} color="blue" />
          </MapContainer>
        </Box>
      )}
    </Container>
  );
};

export default AttendeeSearchTracking;

import React from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const notifications = [
  { id: 1, icon: <WarningAmberIcon color="error" />, title: "GPS Signal Lost", details: "Asset \"Truck A45\" has lost GPS signal since 10:30 AM." },
  { id: 2, icon: <NotificationsActiveIcon color="warning" />, title: "Payment Due", details: "Payment due for \"Laptop SN1234\" on 15th Feb 2024." }
];

const NotificationsCard = () => {
  return (
    <Box sx={{ maxWidth: 800, p: 2, backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#0C234C" }}>
        Important Notifications
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {notifications.map((notification) => (
          <Grid item xs={12} md={6} key={notification.id}>
            <Card sx={{ p: 2, textAlign: "left" }}>
              <CardContent>
                <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
                  <Grid item>{notification.icon}</Grid>
                  <Grid item>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0C234C" }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#333" }}>
                      {notification.details}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const UserQuickActions = () => {
  return (
    <Box sx={{ maxWidth: 800, p: 2, backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ mt: 2, color: "#0C234C" }}>
        User Quick Actions
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
        <Grid item>
          <Button variant="contained" color="success">
            + Add New Asset
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Request GPS Tagging
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error">
            Generate Report
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export { NotificationsCard, UserQuickActions };

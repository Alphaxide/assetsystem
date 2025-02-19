import React from 'react';
import { Box, Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { AccountBalance, Storage, TrendingUp, Notifications } from '@mui/icons-material';

const InfoCard = ({ title, icon, value }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {value}
        </Typography>
      </CardContent>
      <IconButton sx={{ color: 'primary.main' }}>
        {icon}
      </IconButton>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Total Assets Card */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Total Assets"
            value="$1,200,000"
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* Categories Card */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Categories"
            value="3 Categories"
            icon={<Storage sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* Latest Notifications Card */}
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Latest Notification"
            value="System Update Available"
            icon={<Notifications sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        {/* Assets by Category */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" color="text.secondary">
                  Category 1
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  $500,000
                </Typography>
              </CardContent>
              <IconButton sx={{ color: 'primary.main' }}>
                <TrendingUp sx={{ fontSize: 40 }} />
              </IconButton>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" color="text.secondary">
                  Category 2
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  $400,000
                </Typography>
              </CardContent>
              <IconButton sx={{ color: 'primary.main' }}>
                <TrendingUp sx={{ fontSize: 40 }} />
              </IconButton>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" color="text.secondary">
                  Category 3
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  $300,000
                </Typography>
              </CardContent>
              <IconButton sx={{ color: 'primary.main' }}>
                <TrendingUp sx={{ fontSize: 40 }} />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

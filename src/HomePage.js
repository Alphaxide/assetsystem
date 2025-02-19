import React from 'react';
import CustomAppBar from './CustomAppBar';  // Import your AppBar component
import Dashboard from './Dashboard';  // Import your Dashboard component
import HomePageMap from './AssetsMapPage'; // Import your map component
import PieChart from './PieChart'; // Import PieChart component
import {NotificationsCard, UserQuickActions} from './HomeExtra'; // Import PieChart component
import AssetActivityTable from './ActivityLog';

const HomePage = () => {
  return (
    <div>
      {/* AppBar at the top with margin */}
      <div style={{ marginBottom: '20px' }}>
        <CustomAppBar />
      </div>

      {/* Dashboard below AppBar with margin */}
      <div style={{ marginTop: 125 }}>
        <Dashboard />
      </div>

      {/* Pie Chart */}
      <div style={{ margin: '20px 0' }}>
        <PieChart />
      </div>
{/*
      <div style={{ margin: '0 20px', padding: '10px', maxWidth: '1200px', marginLeft: 'auto', }}>
        <NotificationsCard  />
      </div>

      <div style={{ margin: '0 20px', padding: '20px', maxWidth: '1200px', marginLeft: 'auto', }}>
        <UserQuickActions  />
      </div>

      {/* Container for the Map with margins and centered */}
      <div style={{ margin: '0 20px', padding: '10px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <HomePageMap />
      </div>

      <div style={{ margin: '0 20px', padding: '10px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <AssetActivityTable />
      </div>

    </div>
  );
};

export default HomePage;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./SignUp"; // Adjust path if needed
import SignIn from "./SignIn"; // Import SignIn component
import HomePage from "./HomePage"; // Import HomePage component

import TransactionForm from './TransactionForm';
import TransactionHistory from './TransactionHistory';

import TransactionDetails from './TransactionDetails';

import './style.css';

import AttendeeSearchTracking from './TicketSearch';
import AssetListView from './AssetPage';
import ConfirmPaymentContainer from './ConfirmationPage';
import CreateAsset from './AssetForm';
import AssetDetailsPage from './AssetDetailsPage';

import ProfilePage from './ProfilePage';

import UpdateAsset from './UpdatePage';
import TransferOwnership from './TransferOwnership';

import AssetTracker from './AssetTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} /> 

        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/assets" element={<AssetListView />} />

        <Route path="/pay" element={<TransactionForm />} />
        <Route path="/tracking" element={<AssetTracker />} />

        <Route path="/CreateAsset" element={<CreateAsset />} />



        <Route path="/searchpage" element={<AttendeeSearchTracking />} />

        <Route path="/Updates/:id" element={<UpdateAsset />} />

        <Route path="/transfer/:id" element={<TransferOwnership />} />

        <Route path="/confirm" element={<ConfirmPaymentContainer />} />
        
        
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/payment" element={<TransactionHistory />} />
        <Route path="/asset/:id" element={<AssetDetailsPage />} />

        <Route path="/transaction/:id" element={<TransactionDetails />} />

      </Routes>
    </Router>
  );
}

export default App;

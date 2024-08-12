import React from 'react';
import DashboardSideNav from '../components/DashboardSideNav/DashboardSideNav';
import '../Styles/dashboard.css';
import { Route, Routes } from 'react-router-dom';
import DashboardArtist from './dashboardArtist';
import DashboardVinyl from './dashboardVinyl';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const Dashboard: React.FC = () => {
  return (
    <div className='container'>
      <DashboardSideNav />
      <div className="backContainer">
        <Routes>
        <Route path="artist" element={<ProtectedRoute element={<DashboardArtist />} />} />
        <Route path="vinyl" element={<ProtectedRoute element={<DashboardVinyl />} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

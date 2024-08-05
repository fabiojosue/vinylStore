import React from 'react';
import DashboardSideNav from '../components/DashboardSideNav/DashboardSideNav';
import '../Styles/dashboard.css';
import { Route, Routes } from 'react-router-dom';
import DashboardArtist from './dashboardArtist';

const Dashboard: React.FC = () => {
  return (
    <div className='container'>
      <DashboardSideNav />
      <Routes>
        <Route path="artist" element={<DashboardArtist />} />
      </Routes>
    </div>
  );
};

export default Dashboard;

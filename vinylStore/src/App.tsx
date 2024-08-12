import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ArtistDetails from './pages/artistDetails';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/artist-details" element={<ArtistDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

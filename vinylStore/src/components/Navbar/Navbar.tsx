import React, { useState } from 'react';
import AddVinylModal from '../Modals/AddVinylModal';
import AddArtistModal from '../Modals/AddArtistModal';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isAddVinylModalOpen, setIsAddVinylModalOpen] = useState(false);
  const [isAddArtistModalOpen, setIsAddArtistModalOpen] = useState(false);

  const handleAddVinylClick = () => {
    setIsAddVinylModalOpen(true);
  };

  const handleCloseVinylModal = () => {
    setIsAddVinylModalOpen(false);
  };

  const handleAddArtistClick = () => {
    setIsAddArtistModalOpen(true);
  }

  const handleCloseArtistModal = () => {
    setIsAddArtistModalOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-title">Fabio's Vinyls</div>
      <div className="navbar-buttons">
        <button onClick={handleAddVinylClick}>Add Vinyl</button>
        <button onClick={handleAddArtistClick}>Add Artist</button>
      </div>
      {isAddVinylModalOpen && <AddVinylModal onClose={handleCloseVinylModal} />}
      {isAddArtistModalOpen && <AddArtistModal onClose={handleCloseArtistModal} />}
    </nav>
  );
};

export default Navbar;

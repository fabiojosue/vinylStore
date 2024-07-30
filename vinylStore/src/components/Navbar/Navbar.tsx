import React, { useState } from 'react';
import AddVinylModal from '../Modals/AddVinylModal';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isAddVinylModalOpen, setIsAddVinylModalOpen] = useState(false);

  const handleAddVinylClick = () => {
    setIsAddVinylModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddVinylModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Fabio's Vinyls</div>
      <div className="navbar-buttons">
        <button onClick={handleAddVinylClick}>Add Vinyl</button>
        <button>Add Artist</button>
      </div>
      {isAddVinylModalOpen && <AddVinylModal onClose={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;

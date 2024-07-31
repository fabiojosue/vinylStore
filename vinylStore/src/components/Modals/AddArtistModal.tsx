import React, { useEffect, useState } from 'react';
import { createArtist } from '../../Service/ArtistService';
import './Modals.css';

interface AddArtistModalProps {
    onClose: () => void;
  }

  const AddArtistModal: React.FC<AddArtistModalProps> = ({ onClose }) => {
    const [name, setName] = useState('');
  
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        console.log('Creating artist:', name);
        const createdArtist = await createArtist({name});
        console.log('Artist created successfully:', createdArtist);
        onClose();
      } catch (error) {
        console.error('Error creating artist:', error);
      }
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Add Artist</h2>
          <form onSubmit={handleSubmit}>
  
            <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
            </svg>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Artist Name'/>
            </div>

            <button type="submit">Add Artist</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddArtistModal;
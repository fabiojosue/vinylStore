import React, { useState } from 'react';
import './AddVinylModal.css';

interface AddVinylModalProps {
  onClose: () => void;
}

const AddVinylModal: React.FC<AddVinylModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState(0);
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, artist, price, coverImage });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add Vinyl</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Artist:
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </label>
          <label>
            Cover Image URL:
            <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
          </label>
          <button type="submit">Add Vinyl</button>
        </form>
      </div>
    </div>
  );
};

export default AddVinylModal;

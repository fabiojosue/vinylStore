import React from 'react';
import { deleteVinyl } from '../../Service/VinylService';
import './Vinyl.css';

interface VinylProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  coverImage: string;
  onClick: () => void;
}

const Vinyl: React.FC<VinylProps> = ({ id, title, artist, price, coverImage, onClick }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      console.log('Deleting vinyl:', id);
      await deleteVinyl(id);
      console.log('Vinyl deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting vinyl:', error);
    }
  }

  return (
    <div className="vinyl-card" onClick={onClick}>
      <img src={coverImage} alt={`${title} cover`} />
      <h2>{title}</h2>
      <p>{artist}</p>
      <p>${price.toFixed(2)}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Vinyl;

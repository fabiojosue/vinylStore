import React from 'react';
import './Vinyl.css';
import { deleteVinyl } from '../../Service/VinylService';

interface Artist {
  _id: string;
  name: string;
}

interface VinylProps {
  _id: string;
  title: string;
  artist: Artist | string;
  coverImage: string;
  price: number;
}

const Vinyl: React.FC<VinylProps> = ({ _id, title, artist, coverImage, price }) => {
  const artistName = typeof artist === 'string' ? artist : artist.name;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      console.log('Deleting vinyl:', _id);
      await deleteVinyl(_id!);
      console.log('Vinyl deleted successfully:', _id);
    } catch (error) {
      console.error('Error deleting vinyl:', error);
    }
  }

  return (
    <div className="vinyl-card">
      <img src={coverImage} alt={`${title} cover`} />
      <div className="vinyl-details">
        <h3>{title}</h3>
        <p>{artistName}</p>
        <p>${price}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Vinyl;

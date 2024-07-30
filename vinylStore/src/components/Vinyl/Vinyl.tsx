import React from 'react';
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
  return (
    <div className="vinyl-card" onClick={onClick}>
      <img src={coverImage} alt={`${title} cover`} />
      <h2>{title}</h2>
      <p>{artist}</p>
      <p>${price.toFixed(2)}</p>
    </div>
  );
};

export default Vinyl;

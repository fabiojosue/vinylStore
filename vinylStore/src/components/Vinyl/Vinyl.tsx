import React from 'react';
import './Vinyl.css';
import { useNavigate } from 'react-router-dom';
import type { Vinyl } from "../../Interfaces/Interfaces";

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

const Vinyl: React.FC<VinylProps> = (vinyl: VinylProps) => {
  const artistName = typeof vinyl.artist === 'string' ? vinyl.artist : vinyl.artist.name;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/vinyl-details', { state: { vinyl } });
  };

  return (
    <div className="vinyl-card" onClick={handleClick}>
      <img src={vinyl.coverImage} alt={`${vinyl.title} cover`} />
      <div className="vinyl-details">
        <h3>{vinyl.title}</h3>
        <p>{artistName}</p>
        <p>${vinyl.price}</p>
      </div>
    </div>
  );
};

export default Vinyl;

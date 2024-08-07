import React from 'react';
import './Vinyl.css';

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

  return (
    <div className="vinyl-card">
      <img src={coverImage} alt={`${title} cover`} />
      <div className="vinyl-details">
        <h3>{title}</h3>
        <p>{artistName}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default Vinyl;

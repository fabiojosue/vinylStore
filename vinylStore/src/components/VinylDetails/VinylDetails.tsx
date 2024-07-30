import React from 'react';
import './VinylDetails.css';

interface VinylDetailsProps {
  vinyl: {
    // id: string;
    title: string;
    artist: string;
    price: number;
    coverImage: string;
  };
  onGoBack: () => void;
}

const VinylDetails: React.FC<VinylDetailsProps> = ({ vinyl, onGoBack }) => {
  const { title, artist, price, coverImage } = vinyl;

  return (
    <div className="vinyl-details">
      <img src={coverImage} alt={`${title} cover`} className="vinyl-details-image" />
      <div className="vinyl-details-info">
        <h2>{title}</h2>
        <p>{artist}</p>
        <p>${price.toFixed(2)}</p>
        <button className="go-back-button" onClick={onGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default VinylDetails;

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import vinylsData from '../../../vynils.json';
import Vinyl from '../Vinyl/Vinyl';
import './VinylList.css';
import '../../App.css'

interface VinylData {
  title: string;
  artist: string;
  price: number;
  coverImage: string;
}

interface VinylListProps {
  onVinylClick: (vinyl: VinylData) => void;
}

const VinylList: React.FC<VinylListProps> = ({ onVinylClick }) => {
  return (
    <div className="vinyl-container">
      {vinylsData.vinyls.map((vinyl: VinylData) => (
        <Vinyl 
          key={uuidv4()}
          id={uuidv4()}
          title={vinyl.title}
          artist={vinyl.artist}
          price={vinyl.price}
          coverImage={vinyl.coverImage}
          onClick={() => onVinylClick(vinyl)}
        />
      ))}
    </div>
  );
};

export default VinylList;

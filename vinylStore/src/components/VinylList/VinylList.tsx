import React, { useEffect, useState } from 'react';
import { getVinyls } from '../../Service/VinylService';
import Vinyl from '../Vinyl/Vinyl';
import './VinylList.css';
import '../../App.css';

interface Artist {
  _id: string;
  name: string;
}

interface VinylData {
  _id: string;
  title: string;
  artist: Artist;
  price: number;
  coverImage: string;
}

interface VinylListProps {
  onVinylClick: (vinyl: VinylData) => void;
}

const VinylList: React.FC<VinylListProps> = ({ onVinylClick }) => {
  const [vinyls, setVinyls] = useState<VinylData[]>([]);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const vinylsData = await getVinyls();
        setVinyls(vinylsData);
      } catch (error) {
        console.error('Error fetching vinyls:', error);
      }
    };

    fetchVinyls();
  }, []);

  return (
    <div className="vinyl-container">
      {vinyls.map((vinyl) => (
        <Vinyl
          key={vinyl._id}
          id={vinyl._id}
          title={vinyl.title}
          artist={vinyl.artist.name}
          price={vinyl.price}
          coverImage={vinyl.coverImage}
          onClick={() => onVinylClick(vinyl)}
        />
      ))}
    </div>
  );
};

export default VinylList;

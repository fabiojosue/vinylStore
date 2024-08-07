import React from 'react';
import Vinyl from '../Vinyl/Vinyl';
import './VinylList.css';
import '../../App.css';
import { Vinyl as VinylType } from '../../Interfaces/Interfaces';

interface VinylListProps {
  vinyls: VinylType[];
}

const VinylList: React.FC<VinylListProps> = ({ vinyls }) => {
  return (
    <div className="vinyl-container">
      {vinyls.map((vinyl) => (
        <Vinyl
          key={vinyl._id}
          _id={vinyl._id!}
          title={vinyl.title}
          artist={vinyl.artistFetched!.name}
          price={vinyl.price}
          coverImage={vinyl.coverImage}
        />
      ))}
    </div>
  );
};

export default VinylList;



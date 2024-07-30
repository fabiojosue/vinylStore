// import React, { useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import vinylsData from '../../../vynils.json';
// import Vinyl from '../Vinyl/Vinyl';
// import './VinylList.css';
// import '../../App.css'

// interface VinylData {
//   title: string;
//   artist: string;
//   price: number;
//   coverImage: string;
// }

// interface VinylListProps {
//   onVinylClick: (vinyl: VinylData) => void;
// }

// const VinylList: React.FC<VinylListProps> = ({ onVinylClick }) => {
//   const [vinyls, setVinyls] = React.useState<VinylData[]>([]);
//   useEffect(() => {
//     setVinyls(vinylsData.vinyls);
//   }, [vinyls]);


//   return (
//     <div className="vinyl-container">
//       {vinyls.map((vinyl: VinylData) => (
//         <Vinyl 
//           key={uuidv4()}
//           id={uuidv4()}
//           title={vinyl.title}
//           artist={vinyl.artist}
//           price={vinyl.price}
//           coverImage={vinyl.coverImage}
//           onClick={() => onVinylClick(vinyl)}
//         />
//       ))}
//     </div>
//   );
// };

// export default VinylList;

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getVinyls } from '../../Service/VinylService';
import Vinyl from '../Vinyl/Vinyl';
import './VinylList.css';
import '../../App.css';

interface VinylData {
  id: string;
  title: string;
  artist: string;
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
          key={vinyl.id}
          id={vinyl.id}
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

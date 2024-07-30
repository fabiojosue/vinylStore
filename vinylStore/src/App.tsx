// import { SetStateAction, useState } from 'react'
// import Vinyl from './components/Vinyl/Vinyl';
// import VinylList from './components/VinylList/VinylList';
// import VinylDetails from './components/VinylDetails/VinylDetails';
// import './App.css'

// function App() {
//   const [selectedVynil, setSelectedVynil] = useState(null);

//   const handleVynilClick = (vynil: any) => {
//     setSelectedVynil(vynil);
//   };

//   const handleGoBack = () => {
//     setSelectedVynil(null);
//   };

//   return (
//     <div className="app-container">
//       <h1>Vinyl Collection</h1>
//       {selectedVynil ? (
//         <VinylDetails vynil={selectedVynil} onGoBack={handleGoBack} />
//       ) : (
//         <VinylList onVinylClick={handleVynilClick} />
//       )}
//     </div>
//   );
// }

// export default App
import React, { useState } from 'react';
import VinylList from './components/VinylList/VinylList';
import VinylDetails from './components/VinylDetails/VinylDetails';
import './App.css';

interface VinylData {
  //id: string;
  title: string;
  artist: string;
  price: number;
  coverImage: string;
}

const App: React.FC = () => {
  const [selectedVinyl, setSelectedVinyl] = useState<VinylData | null>(null);

  const handleVinylClick = (vinyl: VinylData) => {
    setSelectedVinyl(vinyl);
  };

  const handleGoBack = () => {
    setSelectedVinyl(null);
  };

  return (
    <div className="app-container">
      <h1>Vinyl Collection</h1>
      {selectedVinyl ? (
        <VinylDetails vinyl={selectedVinyl} onGoBack={handleGoBack} />
      ) : (
        <VinylList onVinylClick={handleVinylClick} />
      )}
    </div>
  );
};

export default App;

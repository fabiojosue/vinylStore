// export default App
import React, { useState } from 'react';
import VinylList from './components/VinylList/VinylList';
import VinylDetails from './components/VinylDetails/VinylDetails';
import Carousel from './components/Carousel/Carousel';
import image1 from './assets/Carousel/image1.webp';
import image2 from './assets/Carousel/image2.webp';
import image3 from './assets/Carousel/image3.webp';
import image4 from './assets/Carousel/image4.webp';
import './App.css';
import Navbar from './components/Navbar/Navbar';

interface VinylData {
  //id: string;
  title: string;
  artist: string;
  price: number;
  coverImage: string;
}

const App: React.FC = () => {
  const [selectedVinyl, setSelectedVinyl] = useState<VinylData | null>(null);
  const images = [image1, image2, image3, image4];

  const handleVinylClick = (vinyl: VinylData) => {
    setSelectedVinyl(vinyl);
  };

  const handleGoBack = () => {
    setSelectedVinyl(null);
  };

  return (
    <div>
      <Navbar />
      <Carousel images={images} />
      <div className="app-container">

      <h2>LAST RELEASES</h2>
      {selectedVinyl ? (
        <VinylDetails vinyl={selectedVinyl} onGoBack={handleGoBack} />
      ) : (
        <VinylList onVinylClick={handleVinylClick}/>
      )}
      </div>
    </div>
    
    
  );
};

export default App;

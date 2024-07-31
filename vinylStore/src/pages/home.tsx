// src/components/Home.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Carousel from '../components/Carousel/Carousel';
import VinylList from '../components/VinylList/VinylList';
import VinylDetails from '../components/VinylDetails/VinylDetails';
import image1 from '../assets/Carousel/image1.webp';
import image2 from '../assets/Carousel/image2.webp';
import image3 from '../assets/Carousel/image3.webp';
import image4 from '../assets/Carousel/image4.webp';

interface VinylData {
  title: string;
  artist: string;
  price: number;
  coverImage: string;
}

const Home: React.FC = () => {
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
          <VinylList onVinylClick={handleVinylClick} />
        )}
      </div>
    </div>
  );
};

export default Home;
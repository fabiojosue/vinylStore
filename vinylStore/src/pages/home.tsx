import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Carousel from '../components/Carousel/Carousel';
import VinylList from '../components/VinylList/VinylList';
import image1 from '../assets/Carousel/image1.webp';
import image2 from '../assets/Carousel/image2.webp';
import image3 from '../assets/Carousel/image3.webp';
import image4 from '../assets/Carousel/image4.webp';

import { getVinyls } from '../Service/VinylService';
import { Vinyl } from '../Interfaces/Interfaces';

const Home: React.FC = () => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const fetchVinyls = async () => {
      const data: Vinyl[] = await getVinyls();
      setVinyls(data);
    };
    fetchVinyls();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel images={images} />
      <div className="app-container">
        <h2>LAST RELEASES</h2>
        <VinylList vinyls={vinyls} />
      </div>
    </div>
  );
};

export default Home;



import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Carousel from '../components/Carousel/Carousel';
import VinylList from '../components/VinylList/VinylList';
import image1 from '../assets/Carousel/image1.webp';
import image2 from '../assets/Carousel/image2.webp';
import image3 from '../assets/Carousel/image3.webp';
import image4 from '../assets/Carousel/image4.webp';

import { getVinyls } from '../Service/VinylServiceGraphql';
import { getArtists } from '../Service/ArtistServiceGraphql';
import { Vinyl, Artist } from '../Interfaces/Interfaces';
import ArtistList from '../components/ArtistList/ArtistList';
import Footer from '../components/Footer/Footer';

const Home: React.FC = () => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const fetchVinyls = async () => {
      const data: Vinyl[] = await getVinyls();
      setVinyls(data);

      const artistsData: Artist[] = await getArtists();
      setArtists(artistsData);
    };
    fetchVinyls();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel images={images} />
      <div className="app-container">
        <h2>TOP VINYLS</h2>
        <VinylList vinyls={vinyls} />
        <hr></hr>
        <h2>BROWSE ARTISTS</h2>
        <ArtistList artists={artists} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;



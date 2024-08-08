import React, { useState } from 'react';
import Vinyl from '../Vinyl/Vinyl';
import './VinylList.css';
import '../../App.css';
import { Vinyl as VinylType } from '../../Interfaces/Interfaces';

interface VinylListProps {
  vinyls: VinylType[];
}

const VinylList: React.FC<VinylListProps> = ({ vinyls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleVinyls = vinyls.slice(currentIndex, currentIndex + 5);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 5 < vinyls.length ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="carousel-container">
      <button onClick={handlePrevClick} className="carousel-card-button prev-button">
        &#9664; {/* Left arrow */}
      </button>

      <div className="vinyl-container">
        {visibleVinyls.map((vinyl) => (
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

      <button onClick={handleNextClick} className="carousel-card-button next-button">
        &#9654; {/* Right arrow */}
      </button>
    </div>
  );
};

export default VinylList;


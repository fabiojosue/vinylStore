import { SetStateAction, useState } from 'react'
import Vinyl from './components/Vinyl/Vinyl';
import VinylList from './components/VinylList/VinylList';
import './App.css'

function App() {
  const [selectedVynil, setSelectedVynil] = useState(null);

  const handleVynilClick = (vynil: any) => {
    setSelectedVynil(vynil);
  };

  const handleGoBack = () => {
    setSelectedVynil(null);
  };

  return (
    <div className="app-container">
      <h1>Vinyl Collection</h1>
      <VinylList onVinylClick={handleVynilClick} />
      {/* {selectedVynil ? (
        <VynilDetails vynil={selectedVynil} onGoBack={handleGoBack} />
      ) : (
        <VinylList onVinylClick={handleVynilClick} />
      )} */}
    </div>
  );
}

export default App

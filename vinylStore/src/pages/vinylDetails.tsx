import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Vinyl } from "../Interfaces/Interfaces";
import "../Styles/artistDetails.css";
import Navbar from "../components/Navbar/Navbar";
import SpotifyService from "../Service/SpotifyService";
import Notification from "../components/Notification/Notification";
import '../Styles/dashboard.css';

const VinylDetails: React.FC = () => {
  const location = useLocation();
  const { vinyl } = location.state as { vinyl: Vinyl };
  const [cart, setCart] = useState<Vinyl[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [vinylTracks, setVinylTrack] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const vinylId = await SpotifyService.search('album', vinyl.title, 1);
        const vinylSpotifyId = vinylId.albums.items[0].id;
        if (vinylSpotifyId) {
          setVinylTrack(await SpotifyService.getAlbum(vinylSpotifyId));
        } else {
          setError('Failed to fetch vinyl details.');
        }
      } catch (err) {
        setError('An error occurred while fetching vinyl details.');
        console.error(err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchArtist();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = () => {
    const newCart = [...cart, vinyl];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setNotification('Vinyl added to cart!'); // Show notification
  };

  return (
    <div>
      <Navbar />
      {notification && <Notification message={notification} />} {/* Render notification */}
      <div className="artist-details-page">
        <div className="img-container">
        <h1>{vinyl.title} ${vinyl.price}</h1>
          {vinylTracks && <p>See on <a href={vinylTracks.external_urls.spotify} target="_blank" rel="noopener noreferrer">Spotify.</a></p>}
          <img src={vinyl.coverImage} alt={`${vinyl.title} photo`} />
        </div>
        <div className="divider"></div>
        <div>
          <h2>Album Tracks</h2>
          <div className="tracks-container">
            {!isLoaded && <div className="loading-circle"></div>}
            {vinylTracks && vinylTracks.tracks.items.map((track: any) => (
              <div key={track.id} className="track">
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  height={80}
                  frameBorder="0"
                  allow="encrypted-media"
                  title={track.name}
                ></iframe>
              </div>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={addToCart}>Add to cart</button>
          <Link to="/" className="goBackBtn">Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default VinylDetails;

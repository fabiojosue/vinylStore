import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Vinyl } from "../Interfaces/Interfaces";
import "../Styles/artistDetails.css";
import Navbar from "../components/Navbar/Navbar";
import SpotifyService from "../Service/SpotifyService";
import '../Styles/dashboard.css';

const VinylDetails: React.FC = () => {
  const location = useLocation();
  const { vinyl } = location.state as { vinyl: Vinyl };
  const [error, setError] = useState<string | null>(null);
  const [vinylTracks, setVinylTrack] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        console.log("vinylDataaaa",vinylTracks);
        setIsLoaded(true);
      }
    };

    fetchArtist();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="artist-details-page">
        <div>
          <img src={vinyl.coverImage} alt={`${vinyl.title} photo`} />
        </div>
        <div className="divider"></div>
        <div>
          <h1>{vinyl.title}</h1>
          <p>${vinyl.price}</p>
          {vinylTracks &&<p>See on <a href={vinylTracks.external_urls.spotify} target="_blank" rel="noopener noreferrer">Spotify.</a></p>}
          <h2>Top Tracks</h2>
          <div className="tracks-container">
            {!isLoaded && <div className="loading-circle"></div>}
            {vinylTracks && vinylTracks.tracks.items.map((track: any) => (
              <div key={track.id} className="track">
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  frameBorder="0"
                  allow="encrypted-media"
                  title={track.name}
                ></iframe>
              </div>
            ))}
          </div>
          <Link to="/" className="goBackBtn">Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default VinylDetails;

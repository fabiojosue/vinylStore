import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Artist } from "../Interfaces/Interfaces";
import "../Styles/artistDetails.css";
import Navbar from "../components/Navbar/Navbar";
import SpotifyService from "../Service/SpotifyService";

const ArtistDetails: React.FC = () => {
  const location = useLocation();
  const { artist } = location.state as { artist: Artist };
  const [spotifyArtist, setSpotifyArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [artistTracks, setArtistTrack] = useState<any>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistId = await SpotifyService.search('artist', artist.name, 1);
        const artistSpotifyId = artistId.artists.items[0].id;
        if (artistSpotifyId) {
          setSpotifyArtist(await SpotifyService.getArtist(artistSpotifyId));
          console.log("artistData",spotifyArtist);
          setArtistTrack(await SpotifyService.getTopTracks(artistSpotifyId));
        } else {
          setError('Failed to fetch artist details.');
        }
      } catch (err) {
        setError('An error occurred while fetching artist details.');
        console.error(err);
      }
    };

    fetchArtist();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="artist-details-page">
        <div>
          <img src={artist.imageURL} alt={`${artist.name} photo`} />
        </div>
        <div className="divider"></div>
        <div>
          <h1>{artist.name}</h1>
          <p>{artist.biography}</p>
          <h2>Top Tracks</h2>
          <div className="tracks-container">
            {artistTracks && artistTracks.tracks.map((track: any) => (
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

export default ArtistDetails;

import React from "react";
import type { Artist } from "../../Interfaces/Interfaces";
import "./Artist.css";

interface ArtistProps {
  _id: string;
  name: string;
  biography: string;
  imageURL: string;
}

const Artist: React.FC<ArtistProps> = ( artist: Artist ) => {
  return (
    <div className="artist-card">
      <img src={artist.imageURL} alt={`${artist.name} photo`} />
      <div className="artist-details">
        <h3>{artist.name}</h3>
      </div>
    </div>
  );
}

export default Artist;
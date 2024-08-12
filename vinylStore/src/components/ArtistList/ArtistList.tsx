import React, { useState } from "react";
import Artist from "../Artist/Artist";
import "./ArtistList.css";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="artist-list">
      <input
        type="text"
        placeholder="Search artists..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="artist-container">
        {filteredArtists.map((artist) => (
          <Artist
            key={artist._id}
            _id={artist._id!}
            name={artist.name}
            biography={artist.biography}
            imageURL={artist.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
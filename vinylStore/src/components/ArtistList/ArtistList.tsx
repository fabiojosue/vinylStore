import React from "react";
import  Artist  from "../Artist/Artist";
import "./ArtistList.css";
import {Artist as ArtistType} from "../../Interfaces/Interfaces";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
    return (
        <div className="artist-container">
        {artists.map((artist) => (
            <Artist
            key={artist._id}
            _id={artist._id!}
            name={artist.name}
            biography={artist.biography}
            imageURL={artist.imageURL}
            />
        ))}
        </div>
    );
    };

export default ArtistList;
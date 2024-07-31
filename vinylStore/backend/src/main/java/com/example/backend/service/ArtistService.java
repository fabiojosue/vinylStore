package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(String id) {
        return artistRepository.findById(id).orElse(null);
    }

    public Artist updateArtist(String id, Artist artistDetails) {
        Artist artist = artistRepository.findById(id).orElse(null);
        if (artist != null) {
            artist.setName(artistDetails.getName());
            return artistRepository.save(artist);
        }
        return null;
    }

    public void deleteArtist(String id) {
        artistRepository.deleteById(id);
    }
}

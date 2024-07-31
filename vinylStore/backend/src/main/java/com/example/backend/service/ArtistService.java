package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.entity.Vinyl;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.repository.VinylRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private VinylRepository vinylRepository;

    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(String id) {
        return artistRepository.findById(id).orElse(null);
    }

    public boolean isArtistInVinyl(String id) {
        List<Vinyl> vinyls = vinylRepository.findAll();
        for (Vinyl vinyl : vinyls) {
            if (Objects.equals(vinyl.getArtist(), id)) {
                return true;
            }
        }
        return false;
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
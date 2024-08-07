package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.VinylInput;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.repository.VinylRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VinylService {

    @Autowired
    private VinylRepository vinylRepository;
    @Autowired
    private ArtistRepository artistRepository;

    public Vinyl saveVinyl(VinylInput vinylInput) {
        Vinyl vinyl = new Vinyl(vinylInput.title(), vinylInput.artist(), vinylInput.coverImage(), vinylInput.price());
        return vinylRepository.save(vinyl);
    }

    public List<Vinyl> getAllVinyls() {
        List<Vinyl> data = vinylRepository.findAll();
        for (Vinyl vinyl : data) {
            Optional<Artist> artist= artistRepository.findById(vinyl.getArtist());
            vinyl.setArtistFetched(artist.get());
        }
        return data;
    }

    public Vinyl getVinylById(String id) {
        Vinyl vinyl = vinylRepository.findById(id).orElse(null);
        Optional<Artist> artist= artistRepository.findById(vinyl.getArtist());
        vinyl.setArtistFetched(artist.get());
        return vinyl;
    }

    public Vinyl updateVinyl(String id, VinylInput vinylInput) {
        Vinyl vinyl = vinylRepository.findById(id).orElse(null);
        if (vinyl != null) {
            vinyl.setTitle(vinylInput.title());
            vinyl.setArtist(vinylInput.artist());
            vinyl.setCoverImage(vinylInput.coverImage());
            vinyl.setPrice(vinylInput.price());
            return vinylRepository.save(vinyl);
        }
        return null;
    }

    public String deleteVinyl(String id) {
        vinylRepository.deleteById(id);
        return "Deleted";
    }
}

package com.example.backend.controller;

import com.example.backend.entity.Artist;
import com.example.backend.entity.dto.ArtistInput;
import com.example.backend.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ArtistController {

    private final ArtistService artistService;
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @MutationMapping
    public Artist createArtist(@Argument ArtistInput artistInput) {
        return artistService.saveArtist(artistInput);
    }

    @MutationMapping
    public Boolean isArtistUsed(@Argument String id){
        return artistService.isArtistInVinyl(id);
    }

    @QueryMapping
    public List<Artist> getAllArtists() {
        return artistService.getAllArtists();
    }

    @QueryMapping
    public Artist getArtistById(@Argument String _id) {
        return artistService.getArtistById(_id);
    }

    @MutationMapping
    public Artist updateArtist(@Argument String id,@Argument ArtistInput artistInput) {
        return artistService.updateArtist(id, artistInput);
    }

    @MutationMapping
    public String deleteArtist(@Argument String id) {
        artistService.deleteArtist(id);
        return "Deleted";
    }
}

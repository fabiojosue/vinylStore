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

import java.util.List;

/**
 * Controller for handling artist-related operations.
 */
@Controller
public class ArtistController {

    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    /**
     * Creates a new artist.
     *
     * @param artistInput the input data for the artist
     * @return the created Artist entity
     */
    @MutationMapping
    public Artist createArtist(@Argument ArtistInput artistInput) {
        return artistService.saveArtist(artistInput);
    }

    /**
     * Checks if an artist is associated with any vinyl records.
     *
     * @param id the ID of the artist
     * @return true if the artist is associated with vinyl records, false otherwise
     */
    @MutationMapping
    public Boolean isArtistUsed(@Argument String id) {
        return artistService.isArtistInVinyl(id);
    }

    /**
     * Retrieves all artists.
     *
     * @return a list of all Artist entities
     */
    @QueryMapping
    public List<Artist> getAllArtists() {
        return artistService.getAllArtists();
    }

    /**
     * Retrieves an artist by their ID.
     *
     * @param _id the ID of the artist
     * @return the Artist entity
     */
    @QueryMapping
    public Artist getArtistById(@Argument String _id) {
        return artistService.getArtistById(_id);
    }

    /**
     * Updates an existing artist's details.
     *
     * @param id the ID of the artist to update
     * @param artistInput the updated artist details
     * @return the updated Artist entity
     */
    @MutationMapping
    public Artist updateArtist(@Argument String id, @Argument ArtistInput artistInput) {
        return artistService.updateArtist(id, artistInput);
    }

    /**
     * Deletes an artist by their ID.
     *
     * @param id the ID of the artist to delete
     * @return a confirmation message
     */
    @MutationMapping
    public String deleteArtist(@Argument String id) {
        artistService.deleteArtist(id);
        return "Deleted";
    }
}

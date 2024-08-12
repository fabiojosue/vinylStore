package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.ArtistInput;
import com.example.backend.exception.ArtistNotFoundException;
import com.example.backend.exception.InvalidArtistDataException;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.repository.VinylRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Objects;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private VinylRepository vinylRepository;

    /**
     * Saves a new artist to the repository after validating the input data.
     *
     * @param artistInput the input data for the artist
     * @return the saved Artist entity
     * @throws InvalidArtistDataException if the artist data is invalid
     */
    public Artist saveArtist(ArtistInput artistInput) {
        validateArtistInput(artistInput);
        Artist artist = new Artist(artistInput.name(), artistInput.imageURL(), artistInput.biography());
        return artistRepository.save(artist);
    }

    /**
     * Retrieves all artists from the repository.
     *
     * @return a list of all Artist entities
     */
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    /**
     * Retrieves an artist by their ID.
     *
     * @param id the ID of the artist
     * @return the Artist entity
     * @throws ArtistNotFoundException if the artist is not found
     * @throws ValidationException if the provided ID is invalid
     */
    public Artist getArtistById(String id) {
        validateId(id);
        return artistRepository.findById(id)
                .orElseThrow(() -> new ArtistNotFoundException("Artist not found with id: " + id));
    }

    /**
     * Checks if the artist is associated with any vinyl records.
     *
     * @param id the ID of the artist
     * @return true if the artist is associated with any vinyl records, false otherwise
     * @throws ValidationException if the provided ID is invalid
     */
    public boolean isArtistInVinyl(String id) {
        validateId(id);
        List<Vinyl> vinyls = vinylRepository.findAll();
        return vinyls.stream().anyMatch(vinyl -> Objects.equals(vinyl.getArtist(), id));
    }

    /**
     * Updates an existing artist's details.
     *
     * @param id the ID of the artist to update
     * @param artistDetails the updated artist details
     * @return the updated Artist entity
     * @throws ArtistNotFoundException if the artist is not found
     * @throws InvalidArtistDataException if the artist data is invalid
     * @throws ValidationException if the provided ID is invalid
     */
    public Artist updateArtist(String id, ArtistInput artistDetails) {
        validateId(id);
        validateArtistInput(artistDetails);

        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ArtistNotFoundException("Artist not found with id: " + id));

        artist.setName(artistDetails.name());
        artist.setBiography(artistDetails.biography());
        artist.setImageURL(artistDetails.imageURL());
        return artistRepository.save(artist);
    }

    /**
     * Deletes an artist by their ID.
     *
     * @param id the ID of the artist to delete
     * @throws ArtistNotFoundException if the artist is not found
     * @throws ValidationException if the provided ID is invalid
     */
    public void deleteArtist(String id) {
        validateId(id);

        if (!artistRepository.existsById(id)) {
            throw new ArtistNotFoundException("Artist not found with id: " + id);
        }

        artistRepository.deleteById(id);
    }

    /**
     * Validates the artist input data.
     *
     * @param artistInput the artist input data to validate
     * @throws InvalidArtistDataException if the artist data is invalid
     */
    private void validateArtistInput(ArtistInput artistInput) {
        if (artistInput == null ||
                !StringUtils.hasText(artistInput.name()) ||
                !StringUtils.hasText(artistInput.imageURL()) ||
                !StringUtils.hasText(artistInput.biography())) {
            throw new InvalidArtistDataException("Invalid artist data provided");
        }
    }

    /**
     * Validates the provided artist ID.
     *
     * @param id the artist ID to validate
     * @throws ValidationException if the provided ID is invalid
     */
    private void validateId(String id) {
        if (!StringUtils.hasText(id)) {
            throw new ValidationException("Invalid ID provided");
        }
    }
}

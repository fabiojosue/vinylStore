package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.VinylInput;
import com.example.backend.exception.ArtistNotFoundException;
import com.example.backend.exception.InvalidVinylDataException;
import com.example.backend.exception.VinylNotFoundException;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.repository.VinylRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing vinyl records.
 */
@Service
public class VinylService {

    @Autowired
    private VinylRepository vinylRepository;

    @Autowired
    private ArtistRepository artistRepository;

    /**
     * Saves a new vinyl record to the repository after validating the input data.
     *
     * @param vinylInput the input data for the vinyl
     * @return the saved Vinyl entity
     * @throws InvalidVinylDataException if the vinyl data is invalid
     * @throws ArtistNotFoundException if the artist does not exist
     */
    public Vinyl saveVinyl(VinylInput vinylInput) {
        validateVinylInput(vinylInput);

        if (!artistRepository.existsById(vinylInput.artist())) {
            throw new ArtistNotFoundException("Artist not found with id: " + vinylInput.artist());
        }

        Vinyl vinyl = new Vinyl(vinylInput.title(), vinylInput.artist(), vinylInput.coverImage(), vinylInput.price());
        return vinylRepository.save(vinyl);
    }

    /**
     * Retrieves all vinyl records from the repository with associated artist information.
     *
     * @return a list of all Vinyl entities with fetched artist data
     */
    public List<Vinyl> getAllVinyls() {
        List<Vinyl> data = vinylRepository.findAll();
        for (Vinyl vinyl : data) {
            Optional<Artist> artist = artistRepository.findById(vinyl.getArtist());
            vinyl.setArtistFetched(artist.orElse(null));
        }
        return data;
    }

    /**
     * Retrieves a vinyl record by its ID with associated artist information.
     *
     * @param id the ID of the vinyl record
     * @return the Vinyl entity with fetched artist data
     * @throws VinylNotFoundException if the vinyl record is not found
     * @throws ArtistNotFoundException if the associated artist is not found
     * @throws ValidationException if the provided ID is invalid
     */
    public Vinyl getVinylById(String id) {
        validateId(id);

        Vinyl vinyl = vinylRepository.findById(id)
                .orElseThrow(() -> new VinylNotFoundException("Vinyl not found with id: " + id));

        Optional<Artist> artist = artistRepository.findById(vinyl.getArtist());
        vinyl.setArtistFetched(artist.orElse(null));

        return vinyl;
    }

    /**
     * Updates an existing vinyl record.
     *
     * @param id the ID of the vinyl record to update
     * @param vinylInput the new details for the vinyl record
     * @return the updated Vinyl entity
     * @throws VinylNotFoundException if the vinyl record is not found
     * @throws InvalidVinylDataException if the vinyl data is invalid
     * @throws ArtistNotFoundException if the associated artist does not exist
     * @throws ValidationException if the provided ID is invalid
     */
    public Vinyl updateVinyl(String id, VinylInput vinylInput) {
        validateId(id);
        validateVinylInput(vinylInput);

        if (!artistRepository.existsById(vinylInput.artist())) {
            throw new ArtistNotFoundException("Artist not found with id: " + vinylInput.artist());
        }

        Vinyl vinyl = vinylRepository.findById(id)
                .orElseThrow(() -> new VinylNotFoundException("Vinyl not found with id: " + id));

        vinyl.setTitle(vinylInput.title());
        vinyl.setArtist(vinylInput.artist());
        vinyl.setCoverImage(vinylInput.coverImage());
        vinyl.setPrice(vinylInput.price());

        return vinylRepository.save(vinyl);
    }

    /**
     * Deletes a vinyl record by its ID.
     *
     * @param id the ID of the vinyl record to delete
     * @return a confirmation message
     * @throws VinylNotFoundException if the vinyl record is not found
     * @throws ValidationException if the provided ID is invalid
     */
    public String deleteVinyl(String id) {
        validateId(id);

        if (!vinylRepository.existsById(id)) {
            throw new VinylNotFoundException("Vinyl not found with id: " + id);
        }

        vinylRepository.deleteById(id);
        return "Deleted";
    }

    /**
     * Validates the vinyl input data.
     *
     * @param vinylInput the vinyl input data to validate
     * @throws InvalidVinylDataException if the vinyl data is invalid
     */
    private void validateVinylInput(VinylInput vinylInput) {
        if (vinylInput == null ||
                !StringUtils.hasText(vinylInput.title()) ||
                !StringUtils.hasText(vinylInput.artist()) ||
                !StringUtils.hasText(vinylInput.coverImage()) ||
                vinylInput.price() <= 0) {
            throw new InvalidVinylDataException("Invalid vinyl data provided");
        }
    }

    /**
     * Validates the provided ID.
     *
     * @param id the ID to validate
     * @throws ValidationException if the provided ID is invalid
     */
    private void validateId(String id) {
        if (!StringUtils.hasText(id)) {
            throw new ValidationException("Invalid ID provided");
        }
    }
}

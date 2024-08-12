package com.example.backend.controller;

import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.VinylInput;
import com.example.backend.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * Controller for handling vinyl-related operations.
 */
@Controller
public class VinylController {

    private final VinylService vinylService;

    @Autowired
    public VinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }

    /**
     * Creates a new vinyl record.
     *
     * @param vinylInput the input data for the vinyl record
     * @return the created Vinyl entity
     */
    @MutationMapping
    public Vinyl createVinyl(@Argument VinylInput vinylInput) {
        return vinylService.saveVinyl(vinylInput);
    }

    /**
     * Retrieves all vinyl records.
     *
     * @return a list of all Vinyl entities
     */
    @QueryMapping
    public List<Vinyl> getAllVinyls() {
        return vinylService.getAllVinyls();
    }

    /**
     * Retrieves a vinyl record by its ID.
     *
     * @param id the ID of the vinyl record
     * @return the Vinyl entity
     */
    @QueryMapping
    public Vinyl getVinylById(@Argument String id) {
        return vinylService.getVinylById(id);
    }

    /**
     * Updates an existing vinyl record.
     *
     * @param id the ID of the vinyl record to update
     * @param vinylInput the updated vinyl record details
     * @return the updated Vinyl entity
     */
    @MutationMapping
    public Vinyl updateVinyl(@Argument String id, @Argument VinylInput vinylInput) {
        return vinylService.updateVinyl(id, vinylInput);
    }

    /**
     * Deletes a vinyl record by its ID.
     *
     * @param id the ID of the vinyl record to delete
     * @return a confirmation message
     */
    @MutationMapping
    public String deleteVinyl(@Argument String id) {
        return vinylService.deleteVinyl(id);
    }
}

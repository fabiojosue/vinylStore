package com.example.backend.controller;

import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.VinylInput;
import com.example.backend.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class VinylController {

    private final VinylService vinylService;
    public VinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }

    @MutationMapping
    public Vinyl createVinyl(@Argument VinylInput vinylInput) {
        return vinylService.saveVinyl(vinylInput);
    }

    @QueryMapping
    public List<Vinyl> getAllVinyls() {
        return vinylService.getAllVinyls();
    }

    @QueryMapping
    public Vinyl getVinylById(@Argument String id) {
        return vinylService.getVinylById(id);
    }

    @MutationMapping
    public Vinyl updateVinyl(@Argument String id, @Argument VinylInput vinylInput) {
        return vinylService.updateVinyl(id, vinylInput);
    }

    @MutationMapping
    public String deleteVinyl(@Argument String id) {
        return vinylService.deleteVinyl(id);
    }
}

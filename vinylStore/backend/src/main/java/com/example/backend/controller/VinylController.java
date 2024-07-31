package com.example.backend.controller;

import com.example.backend.entity.Vinyl;
import com.example.backend.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    @Autowired
    private VinylService vinylService;

    @PostMapping
    public Vinyl createVinyl(@RequestBody Vinyl vinyl) {
        return vinylService.saveVinyl(vinyl);
    }

    @GetMapping
    public List<Vinyl> getAllVinyls() {
        return vinylService.getAllVinyls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vinyl> getVinylById(@PathVariable String id) {
        Vinyl vinyl = vinylService.getVinylById(id);
        if (vinyl != null) {
            return ResponseEntity.ok(vinyl);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Vinyl> updateVinyl(@PathVariable String id, @RequestBody Vinyl vinylDetails) {
        Vinyl updatedVinyl = vinylService.updateVinyl(id, vinylDetails);
        if (updatedVinyl != null) {
            return ResponseEntity.ok(updatedVinyl);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVinyl(@PathVariable String id) {
        vinylService.deleteVinyl(id);
        return ResponseEntity.ok().build();
    }
}

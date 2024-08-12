package com.example.backend.service;

import com.example.backend.entity.Artist;
import com.example.backend.entity.Vinyl;
import com.example.backend.entity.dto.ArtistInput;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.repository.VinylRepository;
import com.example.backend.service.ArtistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ArtistServiceTest {

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private VinylRepository vinylRepository;

    @InjectMocks
    private ArtistService artistService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveArtist() {
        ArtistInput input = new ArtistInput("Test Artist", "imageURL", "Biography");
        Artist artist = new Artist(input.name(), input.imageURL(), input.biography());

        when(artistRepository.save(any(Artist.class))).thenReturn(artist);

        Artist savedArtist = artistService.saveArtist(input);

        assertNotNull(savedArtist);
        assertEquals("Test Artist", savedArtist.getName());
        verify(artistRepository, times(1)).save(any(Artist.class));
    }

    @Test
    void testGetAllArtists() {
        Artist artist1 = new Artist("Artist 1", "imageURL1", "Biography 1");
        Artist artist2 = new Artist("Artist 2", "imageURL2", "Biography 2");

        when(artistRepository.findAll()).thenReturn(Arrays.asList(artist1, artist2));

        List<Artist> artists = artistService.getAllArtists();

        assertNotNull(artists);
        assertEquals(2, artists.size());
        verify(artistRepository, times(1)).findAll();
    }

    @Test
    void testGetArtistById() {
        Artist artist = new Artist("Artist 1", "imageURL1", "Biography 1");
        String artistId = "1";

        when(artistRepository.findById(artistId)).thenReturn(Optional.of(artist));

        Artist foundArtist = artistService.getArtistById(artistId);

        assertNotNull(foundArtist);
        assertEquals("Artist 1", foundArtist.getName());
        verify(artistRepository, times(1)).findById(artistId);
    }

    @Test
    void testIsArtistInVinyl() {
        Vinyl vinyl = new Vinyl();
        vinyl.setArtist("1");
        when(vinylRepository.findAll()).thenReturn(Arrays.asList(vinyl));

        boolean result = artistService.isArtistInVinyl("1");

        assertTrue(result);
        verify(vinylRepository, times(1)).findAll();
    }

    @Test
    void testUpdateArtist() {
        Artist artist = new Artist("Artist 1", "imageURL1", "Biography 1");
        String artistId = "1";
        ArtistInput updatedDetails = new ArtistInput("Updated Name", "newImageURL", "New Biography");

        when(artistRepository.findById(artistId)).thenReturn(Optional.of(artist));
        when(artistRepository.save(any(Artist.class))).thenReturn(artist);

        Artist updatedArtist = artistService.updateArtist(artistId, updatedDetails);

        assertNotNull(updatedArtist);
        assertEquals("Updated Name", updatedArtist.getName());
        verify(artistRepository, times(1)).findById(artistId);
        verify(artistRepository, times(1)).save(artist);
    }

}

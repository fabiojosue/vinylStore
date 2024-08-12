package com.example.backend.exception;

/**
 * Exception thrown when an artist is not found in the repository.
 */
public class ArtistNotFoundException extends RuntimeException {
    public ArtistNotFoundException(String message) {
        super(message);
    }
}


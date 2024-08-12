package com.example.backend.exception;

/**
 * Exception thrown when invalid data is provided for an artist.
 */
public class InvalidArtistDataException extends RuntimeException {
    public InvalidArtistDataException(String message) {
        super(message);
    }
}

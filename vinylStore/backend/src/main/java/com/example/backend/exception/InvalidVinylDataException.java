package com.example.backend.exception;

/**
 * Exception thrown when invalid data is provided for a vinyl record.
 */
public class InvalidVinylDataException extends RuntimeException {

    public InvalidVinylDataException(String message) {
        super(message);
    }
}

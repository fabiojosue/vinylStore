package com.example.backend.exception;

/**
 * Exception thrown when a vinyl record is not found in the repository.
 */
public class VinylNotFoundException extends RuntimeException {

    public VinylNotFoundException(String message) {
        super(message);
    }
}

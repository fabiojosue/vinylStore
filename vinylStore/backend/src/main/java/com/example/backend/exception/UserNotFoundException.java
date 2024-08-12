package com.example.backend.exception;

/**
 * Exception thrown when a user is not found in the repository.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}

package com.example.backend.exception;

/**
 * Exception thrown when invalid data is provided for a user.
 */
public class InvalidUserDataException extends RuntimeException {

    public InvalidUserDataException(String message) {
        super(message);
    }
}

package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.dto.UserInput;
import com.example.backend.exception.InvalidUserDataException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user with encrypted password after validating the input data.
     *
     * @param userInput the input data for the user
     * @return the registered User entity
     * @throws InvalidUserDataException if the user data is invalid
     */
    public User register(UserInput userInput) {
        validateUserInput(userInput);
        User user = new User(userInput.username(), userInput.password());
        user.setPassword(passwordEncoder.encode(userInput.password()));
        return userRepository.save(user);
    }

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user
     * @return the User entity if found
     * @throws UserNotFoundException if the user is not found
     */
    public User findByUsername(String username) {
        validateUsername(username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    /**
     * Validates the user input data.
     *
     * @param userInput the user input data to validate
     * @throws InvalidUserDataException if the user data is invalid
     */
    private void validateUserInput(UserInput userInput) {
        if (userInput == null ||
                !StringUtils.hasText(userInput.username()) ||
                !StringUtils.hasText(userInput.password())) {
            throw new InvalidUserDataException("Invalid user data provided");
        }
    }

    /**
     * Validates the provided username.
     *
     * @param username the username to validate
     * @throws InvalidUserDataException if the username is invalid
     */
    private void validateUsername(String username) {
        if (!StringUtils.hasText(username)) {
            throw new InvalidUserDataException("Invalid username provided");
        }
    }
}

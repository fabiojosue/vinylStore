package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.entity.dto.UserInput;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling user-related operations.
 */
@Controller
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user with the provided user input.
     *
     * @param userInput the input data for the new user
     * @return the registered User entity
     */
    @MutationMapping
    public User registerUser(@Argument UserInput userInput) {
        return userService.register(userInput);
    }

    /**
     * Authenticates a user and generates a JWT token if the credentials are valid.
     *
     * @param userInput the input data containing username and password
     * @return a JWT token if authentication is successful, otherwise an error message
     */
    @MutationMapping
    public String loginUser(@Argument UserInput userInput) {
        User foundUser = userService.findByUsername(userInput.username());
        if (foundUser != null && passwordEncoder.matches(userInput.password(), foundUser.getPassword())) {
            return jwtUtil.generateToken(foundUser.getUsername());
        }
        return "Invalid username or password";
    }
}

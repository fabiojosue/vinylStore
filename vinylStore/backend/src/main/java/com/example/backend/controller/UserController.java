package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.entity.dto.UserInput;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MutationMapping
    public User registerUser(@Argument UserInput userInput) {
        return userService.register(userInput);
    }

    @MutationMapping
    public String loginUser(@Argument UserInput userInput) {
        User foundUser = userService.findByUsername(userInput.username());
        if (foundUser != null && passwordEncoder.matches(userInput.password(), foundUser.getPassword())) {
            return jwtUtil.generateToken(foundUser.getUsername());
        }
        return "Invalid username or password";
    }
}

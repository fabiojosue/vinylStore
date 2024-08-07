package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.dto.UserInput;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(UserInput userInput) {
        User user = new User(userInput.username(), userInput.password());
        user.setPassword(passwordEncoder.encode(userInput.password()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.orElse(null);
    }
}

package com.example.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class for generating and parsing JSON Web Tokens (JWTs).
 */
@Component
public class JwtUtil {

    // Secret key used for signing the JWTs
    private final String secret = "superSecretSuperSecretSuperSecretSuperSecret";
    private final Key key = Keys.hmacShaKeyFor(secret.getBytes());

    /**
     * Generates a JWT token for the given username.
     *
     * @param username the username for which the token is generated
     * @return the generated JWT token as a String
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set the subject of the token (username)
                .setIssuedAt(new Date()) // Set the issued date of the token
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Set expiration time (10 hours from now)
                .signWith(key, SignatureAlgorithm.HS256) // Sign the token with the specified key and algorithm
                .compact(); // Build the JWT token
    }

    /**
     * Extracts the username from the given JWT token.
     *
     * @param token the JWT token from which the username is extracted
     * @return the username contained in the token
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // Set the key used for verifying the token
                .build()
                .parseClaimsJws(token) // Parse the token
                .getBody()
                .getSubject(); // Extract the username (subject) from the token
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException | ExpiredJwtException | MalformedJwtException | UnsupportedJwtException e) {
            return false;
        }
    }
}

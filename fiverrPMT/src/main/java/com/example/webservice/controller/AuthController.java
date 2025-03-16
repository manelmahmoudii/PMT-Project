package com.example.webservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.webservice.repository.UserRepository;
import com.example.webservice.service.authservice;
import com.example.webservices.model.Users;

import org.springframework.web.bind.annotation.RequestMethod; // Ajoutez cette ligne

@RestController
@RequestMapping("/api/auth")
@Configuration
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private authservice authService;

    @Autowired
    private UserRepository userRepository;
    
   
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        System.out.println("Login endpoint hit"); // Log pour vérifier l'accès
        String email = credentials.get("email");
        String password = credentials.get("password");

        Users authenticatedUser = authService.login(email, password);
        if (authenticatedUser != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("user", authenticatedUser);
            response.put("token", "example_token");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Users user) {
        try {
            Users newUser = authService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
    	Optional<Users> userOptional = userRepository.findByVerificationToken(token);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setVerified(true);
            user.setVerificationToken(null); // Clear the token
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully. You can now login.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token");
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test successful");
    }
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        authService.logout(userId);
        
        // Construire une réponse JSON
        Map<String, String> response = new HashMap<>();
        response.put("message", "Déconnexion réussie");
        
        return ResponseEntity.ok(response);
    }
}
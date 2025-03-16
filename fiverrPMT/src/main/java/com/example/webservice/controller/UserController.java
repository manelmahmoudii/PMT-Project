package com.example.webservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.webservice.repository.UserRepository;
import com.example.webservice.service.UserService;
import com.example.webservice.service.authservice;
import com.example.webservices.model.Users;

@RestController
@RequestMapping("/api/user")
@Configuration
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	@Autowired
    private UserService userservice;
	 @GetMapping
	    public List<Users> getUsers() {
	        return userservice.getAllUsers();
	        
	    }
	 @PostMapping("/AddUser")
	    public ResponseEntity<Users> AddUser(@RequestBody Users user) {
		 if (user.isVerified()) {
		        // Générer un token de vérification si l'utilisateur est vérifié
		        user.setVerificationToken(generateVerificationToken());
		    }
	        Users createdUser = userservice.AddUser(user);
	        return ResponseEntity.ok(createdUser);
	    }
	 private String generateVerificationToken() {
		    return UUID.randomUUID().toString(); // Génération simple d'un token unique
		}
	 
	 @GetMapping("/{id}")
	    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
	        Optional<Users> user = userservice.getUserById(id);
	        return user.map(ResponseEntity::ok)
	                .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    // UPDATE
	    @PutMapping("/update/{id}")
	    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
	        Users updatedUser = userservice.updateUser(id, userDetails);
	        return ResponseEntity.ok(updatedUser);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
	        Optional<Users> userOptional = userservice.getUserById(id);
	        if (!userOptional.isPresent()) {
	            return ResponseEntity.notFound().build();
	        }

	        userservice.deleteUser(id);
	        return ResponseEntity.noContent().build();
	    }
	    @GetMapping("/search")
	    public List<Users> searchUsers(@RequestParam(name = "firstname") String firstname) {
	        return userservice.searchUsersByName(firstname);
	    }

}

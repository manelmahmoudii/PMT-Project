package com.example.webservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webservice.service.Adminservice;
import com.example.webservices.model.admin;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	  @Autowired
	    private Adminservice adminService;

	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
	        String email = credentials.get("email");
	        String password = credentials.get("password");

	        // Appel au service pour authentifier l'admin
	        admin adminUser = adminService.login(email, password);

	        if (adminUser != null) {
	            // Authentification réussie, retourner les détails de l'admin et un token fictif
	            Map<String, Object> response = new HashMap<>();
	            response.put("admin", adminUser);
	            // Remplacer par une logique de génération de token

	            return ResponseEntity.ok(response);
	        } else {
	            // Authentification échouée
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	        }
	    }

}

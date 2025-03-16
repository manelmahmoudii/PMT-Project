package com.example.webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webservice.repository.AdminRepository;
import com.example.webservices.model.admin;

@Service
public class Adminservice {
	@Autowired
    private AdminRepository adminRepository;

	public admin login(String email, String password) {
	    System.out.println("Tentative de login pour: " + email);  // Log du username
	    admin adminUser = adminRepository.findByEmail(email);
	    System.out.println("Admin trouvé: " + adminUser);
	    
	    if (adminUser != null && adminUser.getPassword().equals(password)) {
	        System.out.println("Authentification réussie pour: " + email);
	        return adminUser;
	    } else {
	        System.out.println("Échec de l'authentification pour: " + email);
	        return null;
	    }
	}

}

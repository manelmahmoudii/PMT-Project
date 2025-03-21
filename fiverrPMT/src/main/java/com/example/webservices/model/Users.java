package com.example.webservices.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String firstName;
	    private String lastName;
	    private String email;
	    private String password;

	    @Column(name = "is_verified", nullable = false)
	    private boolean isVerified;
	    @Column(nullable = false)
	    private boolean status;
	    
	    private String verificationToken;

	    // Getters and Setters
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public String getFirstName() {
	        return firstName;
	    }

	    public void setFirstName(String firstName) {
	        this.firstName = firstName;
	    }

	    public String getLastName() {
	        return lastName;
	    }

	    public void setLastName(String lastName) {
	        this.lastName = lastName;
	    }

	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public boolean isVerified() {
	        return isVerified;
	    }

	    public void setVerified(boolean isVerified) {
	        this.isVerified = isVerified;
	    }

	    public String getVerificationToken() {
	        return verificationToken;
	    }

	    public void setVerificationToken(String verificationToken) {
	        this.verificationToken = verificationToken;
	    }
	 // Getter et Setter pour isLoggedIn
	    public boolean isLoggedIn() {
	        return status;
	    }

	    public void setLoggedIn(boolean isLoggedIn) {
	        this.status = isLoggedIn;
	    }
	}
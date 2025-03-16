package com.example.webservice.service;

import java.util.List;

import com.example.webservices.model.Users;

public interface authservice {
	Users login(String email, String password);
    Users register(Users user);
    void verifyEmail(String token);
    void logout(Long userId);

}

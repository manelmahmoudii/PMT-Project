package com.example.webservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webservices.model.Users;
@Repository 
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByVerificationToken(String verificationToken);
    List<Users> findByFirstNameContaining(String firstName);
}
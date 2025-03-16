package com.example.webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.webservices.model.admin;

public interface AdminRepository extends JpaRepository<admin, Integer>{
	     admin findByEmail(String email);

}

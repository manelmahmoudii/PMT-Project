package com.example.webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.webservices.model.ProjectDTO ;

public interface ProjectRepository extends JpaRepository<ProjectDTO ,Long>{

}

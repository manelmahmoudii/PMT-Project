package com.example.webservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.webservices.model.TaskDTO;

public interface TaskRepository extends JpaRepository<TaskDTO, Long> {
	
}

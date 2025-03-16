package com.example.webservice.service;

import java.util.List;

import com.example.webservices.model.ProjectDTO ;

public interface ProjectService {
	List<ProjectDTO > getAllProjects();
	ProjectDTO  getProjectById(Long id);
	ProjectDTO  createProject(ProjectDTO  project);
	ProjectDTO  updateProject(Long id, ProjectDTO  updatedProject);
	void deleteProject(Long id);
}

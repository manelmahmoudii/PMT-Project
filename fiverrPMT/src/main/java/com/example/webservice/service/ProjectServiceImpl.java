package com.example.webservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webservice.repository.ProjectRepository;
import com.example.webservices.model.ProjectDTO ;

@Service
public class ProjectServiceImpl implements ProjectService{
	@Autowired
    private ProjectRepository projectRepository;
@Override
    public List<ProjectDTO > getAllProjects() {
        return projectRepository.findAll();
    }
@Override
    public ProjectDTO  getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }
@Override
    public ProjectDTO  createProject(ProjectDTO  project) {
        return projectRepository.save(project);
    }
@Override
    public ProjectDTO  updateProject(Long id, ProjectDTO  updatedProject) {
        if (projectRepository.existsById(id)) {
            updatedProject.setId(id);
            return projectRepository.save(updatedProject);
        }
        return null;
    }
@Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

}

package com.example.webservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.webservice.repository.ProjectRepository;
import com.example.webservice.repository.TaskRepository;
import com.example.webservice.repository.UserRepository;
import com.example.webservice.service.TaskService;
import com.example.webservices.model.ProjectDTO ;
import com.example.webservices.model.TaskDTO;
import com.example.webservices.model.Users;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	 @Autowired
	    private TaskService taskService;
	  @Autowired
	    private TaskRepository taskRepository;

	    @Autowired
	    private ProjectRepository projectRepository;

	    @Autowired
	    private UserRepository userRepository;


	    @GetMapping
	    public List<TaskDTO> getAllTasks() {
	        return taskService.getAllTasks();
	    }

	    @GetMapping("/{id}")
	    public TaskDTO getTaskById(@PathVariable Long id) {
	        return taskService.getTaskById(id);
	    }

	    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<?> createTask(@RequestParam Long projectId, @RequestParam Long userId, @RequestBody TaskDTO task) {
	        Optional<ProjectDTO  > project = projectRepository.findById(projectId);
	        Optional<Users> user = userRepository.findById(userId);

	        if (project.isEmpty() || user.isEmpty()) {
	            return ResponseEntity.badRequest().body("Invalid project or user ID");
	        }

	        task.setProject(project.get());
	        task.setUser(user.get());
	        TaskDTO newTask = taskRepository.save(task);

	        return ResponseEntity.ok(newTask);
	    }

	    @PutMapping("/update/{id}")
	    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestParam Long projectId, @RequestBody TaskDTO updatedTask) {
	        // Vérifie si la tâche existe
	        TaskDTO existingTask = taskService.getTaskById(id);
	        if (existingTask == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("La tâche avec l'ID " + id + " n'existe pas.");
	        }
	        
	       

	        // Enregistre la tâche mise à jour
	        TaskDTO savedTask = taskService.updateTask(id, updatedTask);
	        
	        return ResponseEntity.ok(savedTask);
	    }

	   
	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestParam Long userId) {
	        // Vérifie si l'utilisateur connecté est le propriétaire de la tâche
	        if (taskService.isTaskOwner(id, userId)) {
	            taskService.deleteTask(id);
	            return ResponseEntity.noContent().build();
	        } else {
	            // Si l'utilisateur n'est pas le propriétaire, renvoie une réponse 403 Forbidden
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'êtes pas autorisé à supprimer cette tâche.");
	        }
	    }
	    @DeleteMapping("/delete/{id}")
	    public void deletetask(@PathVariable Long id) {
	    	taskService.deleteTask(id);
	    }
	 // Nouvelle méthode pour obtenir toutes les tâches avec les projets associés
	    @GetMapping("/with-projects")
	    public List<TaskDTO> getTasksWithProjects() {
	        List<TaskDTO> tasks = taskService.getAllTasks();
	        // Assurez-vous que chaque tâche a son projet chargé (si vous utilisez une stratégie de chargement lazy)
	        for (TaskDTO task : tasks) {
	            task.getProject(); // Charger le projet si nécessaire
	        }
	        return tasks;
	    }
}

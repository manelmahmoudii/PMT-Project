package com.example.webservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webservice.repository.TaskRepository;
import com.example.webservices.model.TaskDTO;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;
@Override
    public List<TaskDTO> getAllTasks() {
	 return taskRepository.findAll();
    }
@Override
    public TaskDTO getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
@Override
    public TaskDTO createTask(TaskDTO task) {
        return taskRepository.save(task);
    }
@Override
    public TaskDTO updateTask(Long id, TaskDTO updatedTask) {
        if (taskRepository.existsById(id)) {
            updatedTask.setId(id);
            return taskRepository.save(updatedTask);
        }
        return null;
    }
@Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
@Override
// Nouvelle méthode pour vérifier que l'utilisateur est le propriétaire de la tâche
public boolean isTaskOwner(Long taskId, Long userId) {
    return taskRepository.findById(taskId)
            .map(task -> task.getUser().getId().equals(userId)) // Vérifie si l'utilisateur de la tâche a le même ID
            .orElse(false); // Renvoie false si la tâche n'existe pas
}


}

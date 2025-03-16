package com.example.webservice.service;

import java.util.List;

import com.example.webservices.model.TaskDTO;

public interface TaskService {
	List<TaskDTO> getAllTasks();
	TaskDTO getTaskById(Long id);
	TaskDTO createTask(TaskDTO task) ;
	TaskDTO updateTask(Long id, TaskDTO updatedTask);
	void deleteTask(Long id);
	boolean isTaskOwner(Long taskId, Long userId);
}

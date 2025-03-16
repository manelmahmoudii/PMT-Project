package com.example.webservice.service;

import java.util.List;
import java.util.Optional;

import com.example.webservices.model.Users;

public interface UserService {
    List<Users> getAllUsers();
     Users AddUser(Users users);
     Users updateUser(Long id, Users updatedUser);
     Optional<Users> getUserById(Long id);
     void deleteUser(Long id);
     List<Users> searchUsersByName(String firstname);
}

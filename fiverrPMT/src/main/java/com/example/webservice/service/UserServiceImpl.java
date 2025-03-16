package com.example.webservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webservice.repository.UserRepository;
import com.example.webservices.model.Users;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
	@Autowired
    private UserRepository userRepository;

	  @Override
	    public List<Users> getAllUsers() {
	        return userRepository.findAll();
	    }
	  @Override
	  public Users AddUser(Users users) {
	        return userRepository.save(users);
	    }
	  @Override
	  // Méthode pour mettre à jour un utilisateur
	    public Users updateUser(Long id, Users updatedUser) {
	        Optional<Users> optionalUser = userRepository.findById(id);
	        if (optionalUser.isPresent()) {
	            Users existingUser = optionalUser.get();
	            existingUser.setFirstName(updatedUser.getFirstName());
	            existingUser.setLastName(updatedUser.getLastName());
	            existingUser.setEmail(updatedUser.getEmail());
	            existingUser.setVerified(updatedUser.isVerified());
	            existingUser.setLoggedIn(updatedUser.isLoggedIn());
	            
	            return userRepository.save(existingUser);
	        } else {
	            throw new RuntimeException("User not found with id " + id);
	        }
	    }
	  @Override
	  public Optional<Users> getUserById(Long id) {
	        return userRepository.findById(id);
	    }
	  @Override
	  public void deleteUser(Long id) {
		  userRepository.deleteById(id);
	    }
	  @Override
	  public List<Users> searchUsersByName(String firstName) {
	        return userRepository.findByFirstNameContaining(firstName);
	    }

}

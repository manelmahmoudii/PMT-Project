package com.example.webservice.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.webservice.repository.UserRepository;
import com.example.webservices.model.Users;
@Service
public class AuthServiceImpl implements authservice {
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void logout(Long userId) {
        Optional<Users> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setLoggedIn(false);  // Mettre l'utilisateur comme étant déconnecté
            userRepository.save(user); // Sauvegarder l'état mis à jour
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
    
    @Override
    public Users login(String email, String password) {
        Optional<Users> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            // Validez le mot de passe et l'état de vérification de l'utilisateur
            if (user.getPassword().equals(password) && user.isVerified()) {
            	 user.setLoggedIn(true);
                 userRepository.save(user);
                return user;
            }
        }
        return null; // Gérer l'échec de la connexion de manière appropriée
    }

    @Override
    public Users register(Users user) {
        // Check if email is already in use
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        user.setVerified(false);
        user.setVerificationToken(UUID.randomUUID().toString());
        Users newUser = userRepository.save(user);
        sendVerificationEmail(newUser);
        return newUser;
    }

    private void sendVerificationEmail(Users user) {
        String to = user.getEmail();
        
        // Vérifier si l'e-mail est valide
        if (to == null || to.isEmpty()) {
            throw new IllegalArgumentException("L'adresse e-mail de l'utilisateur est invalide.");
        }

        String subject = "Email Verification";
        String text = "To verify your email, click the following link: "
                + "http://localhost:8080/api/auth/verify?token=" + user.getVerificationToken();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            mailSender.send(message);
            // Log pour confirmer l'envoi
            System.out.println("Email de vérification envoyé à " + to);
        } catch (MailException e) {
            // Log l'erreur pour le diagnostic
            System.err.println("Erreur lors de l'envoi de l'e-mail de vérification : " + e.getMessage());
            throw new RuntimeException("Impossible d'envoyer l'e-mail de vérification.");
        }
    }

    @Override
    public void verifyEmail(String token) {
        Optional<Users> userOptional = userRepository.findByVerificationToken(token);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setVerified(true);
            user.setVerificationToken(null); // Clear the token after verification
            userRepository.save(user);
        }
    }
}
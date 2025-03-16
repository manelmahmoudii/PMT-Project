package com.example.webservice.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final String storageDirectoryPath = "images/";

    public String saveFile(MultipartFile file) throws IOException {
        Path storageDirectory = Paths.get(storageDirectoryPath);

        // Créer le répertoire s'il n'existe pas
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        // Générer un nom unique pour le fichier
        String fileName =  file.getOriginalFilename();
        Path destination = storageDirectory.resolve(fileName);

        // Sauvegarder le fichier sur le disque
        Files.copy(file.getInputStream(), destination);

        System.out.println("Fichier enregistré dans : " + destination.toAbsolutePath());

        // Retourner le chemin relatif pour l'utiliser dans l'application
        return "http://localhost:8080/images/" + fileName;
    }

}

package com.example.webservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EntityScan("com.*")
@EnableJpaRepositories(basePackages = "com.example.webservice.repository")
@SpringBootApplication(scanBasePackages = {"com.example.webservices","com.example.webservice.controller", "com.example.webservice.config","com.example.webservices.model","com.example.webservice.service"})
public class FiverrPmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(FiverrPmtApplication.class, args);
	}

}

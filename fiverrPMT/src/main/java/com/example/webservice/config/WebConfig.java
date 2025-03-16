package com.example.webservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:images/");
    }
	    public CorsFilter corsFilter() { // Ajoutez @Bean ici
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true);
	        config.addAllowedOrigin("*");
	        config.addAllowedHeader("*");
	        config.addAllowedMethod("GET");
	        config.addAllowedMethod("POST");
	        config.addAllowedMethod("PUT");
	        config.addAllowedMethod("DELETE");
	        config.addExposedHeader("Access-Control-Allow-Origin");
	        config.addExposedHeader("Access-Control-Allow-Methods");
	        config.addExposedHeader("Access-Control-Allow-Headers");
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }
	 
	 @Override
	    public void addCorsMappings(CorsRegistry registry) {
		 
	        registry.addMapping("/**")
	        .allowedOrigins("http://localhost:4200") // Remplacez "*" par des origines spécifiques si nécessaire
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                .allowedHeaders("*")
	                .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers")
	                .allowCredentials(true);
	    }

}
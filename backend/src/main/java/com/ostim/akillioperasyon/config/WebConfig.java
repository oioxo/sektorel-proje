package com.ostim.akillioperasyon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Tüm API yollarını (/**) kapsama alıyoruz
        registry.addMapping("/**")
                // Sadece senin Angular portuna (4200) izin veriyoruz
                .allowedOrigins("http://localhost:4200")
                // Tüm HTTP metodlarına (GET, POST, PUT, DELETE vb.) izin veriyoruz
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Tüm başlık (header) bilgilerine izin veriyoruz
                .allowedHeaders("*")
                // Kimlik doğrulama (cookie vb.) gerekiyorsa true yapıyoruz
                .allowCredentials(true);
    }
}
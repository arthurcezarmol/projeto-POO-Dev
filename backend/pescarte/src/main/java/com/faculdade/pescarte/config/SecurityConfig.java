package com.faculdade.pescarte.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Habilita o CORS (que vai precisar para conectar com o React)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Desabilita CSRF (Cross Site Request Forgery
                .csrf(csrf -> csrf.disable())

                // Define a política de sessão como STATELESS (API REST não guarda estado)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configura as regras de autorização
                .authorizeHttpRequests(authorize -> authorize
                    // Permite acesso público ao endpoint /api/clima
                    //.requestMatchers("/api/clima/**").permitAll()

                    // Permite acesso público ao endpoint de login
                    //.requestMatchers("/api/auth/**").permitAll()

                    // Para QUALQUER outra coisa, exige autenticação
                    //.anyRequest().authenticated()

                        // LIBERANDO TODAS AS PERMISSÕES PARA TESTAR REQUESTS (DEPOIS SERÁ IMPLEMENTADA A SEGURANÇA)
                        .anyRequest().permitAll()
                );

    return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // Porta que o React está rodando
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));

        // Requisições que ele pode realizar
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); --> PODE SER RESTRITIVO
        corsConfiguration.setAllowedHeaders(Arrays.asList("*")); // <-- Permite TODOS os headers
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);     // aplica a todos os endpoints
        return source;
    }
}
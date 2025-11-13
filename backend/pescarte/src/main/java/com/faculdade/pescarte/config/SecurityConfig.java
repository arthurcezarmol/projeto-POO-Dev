package com.faculdade.pescarte.config;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.public.key}")        // Injetando valor na propriedade (esse valor vem do properties)
    private RSAPublicKey publicKey;

    @Value("${jwt.private.key}")        // Injetando valor na propriedade (esse valor vem do properties)
    private RSAPrivateKey privateKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Habilita o CORS (que vai precisar para conectar com o React)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Desabilita CSRF (Cross Site Request Forgery
                .csrf(csrf -> csrf.disable())

                // Configuração para utilizarmos o JWT no projeto
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))

                // Define a política de sessão como STATELESS (API REST não guarda estado)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configura as regras de autorização
                .authorizeHttpRequests(authorize -> authorize
                    // Permite acesso público ao endpoint /api/clima
                    .requestMatchers("/api/clima/**").permitAll()

                    // Permite acesso público ao endpoint de login
                    .requestMatchers("/api/login/**").permitAll()

                    // Para QUALQUER outra coisa, exige autenticação
                    .anyRequest().authenticated()

                        // LIBERANDO TODAS AS PERMISSÕES PARA TESTAR REQUESTS (DEPOIS SERÁ IMPLEMENTADA A SEGURANÇA)
                        // .anyRequest().permitAll()
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

    // O que vai descriptografar e validar o JWT
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

    // O que vai criptografar o JWT
    @Bean
    public JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(this.publicKey).privateKey(privateKey).build();
        var jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
package com.faculdade.pescarte.model;

import com.faculdade.pescarte.dto.LoginRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor          // Gera um construtor vazio
@AllArgsConstructor         // Gera um construtor com todos os argumentos
public class Usuarios {
    // Atributos (colunas do banco de dados)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")            // A coluna do banco se chama exatamente "id"
    private Integer id;             // private Long id;

    @Column(name = "nome", unique = true, nullable = false)
    private String nome;

    @Column(name = "idade",  nullable = false)
    private int idade;

    @Column(name = "genero")
    private String genero;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "renda")
    private BigDecimal renda;       // private Float renda;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "corporativa", nullable = false)
    private String corporativa;

    @Column(name = "senha", nullable = false)
    private String senha;

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(loginRequest.password(), this.senha);
    }
}

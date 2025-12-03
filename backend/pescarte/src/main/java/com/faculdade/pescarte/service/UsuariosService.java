package com.faculdade.pescarte.service;

import com.faculdade.pescarte.model.Usuarios;
import com.faculdade.pescarte.repository.UsuariosRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuariosService {

    // Criando um Repositório
    private final UsuariosRepository usuariosRepository;
    private final PasswordEncoder passwordEncoder;      // Para criptografar a senha

    // Construtor
    @Autowired
    public UsuariosService(UsuariosRepository usuariosRepository, PasswordEncoder passwordEncoder) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;         // Recebe o Bean de SecurityConfig
    }

    // Recebe o objeto INTEIRO 'Usuarios', não apenas strings soltas.
    @Transactional
    public Usuarios registrarUsuarios(Usuarios novoUsuario) {

        // 1. Validação: Verifica se o nome já existe para evitar erro no banco
        if (usuariosRepository.findByUsername(novoUsuario.getNome()).isPresent()) {
            throw new RuntimeException("Este nome de usuário já está em uso.");
        }

        // 2. Criptografia: Pega a senha que veio do front, criptografa e coloca de volta
        String senhaCriptografada = passwordEncoder.encode(novoUsuario.getSenha());
        novoUsuario.setSenha(senhaCriptografada);

        // 3. Salvar: Agora salvamos o objeto completo (com idade, cargo, renda E a senha segura)
        return usuariosRepository.save(novoUsuario);
    }

    // Metodo para buscar os Usuários
    public Optional<Usuarios> buscarUsuarioPorNome(String nome){
        return usuariosRepository.findByUsername(nome);         // do UsuariosRepository
    }
}

package com.faculdade.pescarte.service;

import com.faculdade.pescarte.model.Usuarios;
import com.faculdade.pescarte.repository.UsuariosRepository;
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

    // Metodo que vai registrar o Usuário
    public Usuarios registrarUsuarios(String nome, String senha){
        String senhaCriptografada = passwordEncoder.encode(senha);          // Pega a senha do metodo e criptografa ela
        Usuarios usuario = new Usuarios();
        return usuariosRepository.save(usuario);
    }

    // Metodo para buscar os Usuários
    public Optional<Usuarios> buscarUsuarioPorNome(String nome){
        return usuariosRepository.findByUsername(nome);         // do UsuariosRepository
    }
}

package com.faculdade.pescarte.config;

import com.faculdade.pescarte.model.Usuarios;
import com.faculdade.pescarte.repository.UsuariosRepository;
import jakarta.transaction.Transactional;
import org.hibernate.mapping.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
// CommandLineRunner serve para ele rodar assim que o projeto começar
// Ou seja, toda vez que o projeto começar ele vai tentar cadastrar esse usuário admin.
public class AdminUserConfig implements CommandLineRunner {

    private UsuariosRepository usuariosRepository;

    private BCryptPasswordEncoder passwordEncoder;

    public  AdminUserConfig(UsuariosRepository usuariosRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        var roleAdmin = usuariosRepository.findByCargo("ROLE_ADMIN");           // VER ESSA LINHA

        var userAdmin = usuariosRepository.findByCargo("Desenvolvedor");

        userAdmin.ifPresentOrElse(
            user -> {
                System.out.println("admin ja existe");
            },
                    () -> {
                        var user = new  Usuarios();
                        user.setNome("admin");
                        user.setSenha(passwordEncoder.encode("123"));
                        user.setCargo("Desenvolvedor");
                        user.setCorporativa("UENF");
                        usuariosRepository.save(user);
                    }
        );
    }
}

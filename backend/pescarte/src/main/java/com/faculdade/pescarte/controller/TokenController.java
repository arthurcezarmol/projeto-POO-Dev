package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.dto.LoginRequest;
import com.faculdade.pescarte.dto.LoginResponse;
import com.faculdade.pescarte.repository.UsuariosRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
public class TokenController {

    // Parâmetro necessário para realizar a criptografia do token JWT
    private final JwtEncoder jwtEncoder;

    // Injetando o repositório de Usuários
    private final UsuariosRepository  usuariosRepository;

    // Injetando o Bean do algoritmo que vai criptografar as senhas
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenController(JwtEncoder jwtEncoder,
                           UsuariosRepository usuariosRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.usuariosRepository = usuariosRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // Criando o endpoint
    @PostMapping("api/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
       var usuario = usuariosRepository.findByUsername(loginRequest.username());

       // Se o usuário não existe (ou a credencial está errada) jogamos a exception BadCredentials
       // falando que o usuário ou a senha estão inválidos e não permite que ele faça login no sistema
       // Além de verificar se o usuário existe, é necessário comparar se a senha que o usuário enviou na requisição
       // é a senha que está cadastrada no banco de dados. Para isso serve o mecanismo de comparação de senha
       // Verifica se o usuário existe e se a senha está correta
       if (usuario.isEmpty() || !usuario.get().isLoginCorrect(loginRequest, bCryptPasswordEncoder)) {
           throw new BadCredentialsException("Usuário ou senha inválidos");
       }

       var now = Instant.now();     // momento de agora
       var expiresIn = 300L;        // 300 segundos (5 minutos)

       // Definindo os valores do Token JWT
       var claims = JwtClaimsSet.builder()
               .issuer("mybackend")                             // quem está gerando o token jwt
               .subject(usuario.get().getId().toString())       // o usuário
               .issuedAt(now)                                   // data de emissão do token
               .expiresAt(now.plusSeconds(expiresIn))           // tempo que demora pro token expirar
               .build();

       // montando o "valor" do token jwt para retornar na API
       var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

       return ResponseEntity.ok(new LoginResponse(jwtValue, expiresIn));
    }
}

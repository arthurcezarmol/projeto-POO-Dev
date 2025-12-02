package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.dto.LoginRequest;
import com.faculdade.pescarte.dto.LoginResponse;
import com.faculdade.pescarte.dto.UserDTO;
import com.faculdade.pescarte.model.Usuarios;
import com.faculdade.pescarte.repository.UsuariosRepository;
import com.faculdade.pescarte.service.UsuariosService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
public class TokenController {

    // Parâmetro necessário para realizar a criptografia do token JWT
    private final JwtEncoder jwtEncoder;

    // Injetando o repositório de Usuários
    @Autowired
    private final UsuariosRepository  usuariosRepository;

    // Injetando o Bean do algoritmo que vai criptografar as senhas
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Declarando a variável do Service
    private final UsuariosService usuariosService;

    public TokenController(JwtEncoder jwtEncoder,
                           UsuariosRepository usuariosRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           UsuariosService usuariosService) {
        this.jwtEncoder = jwtEncoder;
        this.usuariosRepository = usuariosRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.usuariosService = usuariosService;
    }

    // Criando o endpoint de login
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

    // Criando o endpoint de registar usuário
    @PostMapping("api/registrar")
    public ResponseEntity<?> criarUsuario(@RequestBody Usuarios novoUsuario) {
        try {
            // Chama o service que criptografa a senha e salva no banco
            Usuarios usuarioSalvo = usuariosService.registrarUsuarios(novoUsuario);

            // Retorna status 201 (Created) e o usuário criado
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);

        } catch (RuntimeException e) {
            // Se o Service lançar erro (ex: "Nome de usuário já existe"), retorna erro 400
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Qualquer outro erro genérico
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar usuário: " + e.getMessage());
        }
    }

    // Retorna os dados do usuário autenticado no momento (baseado no token JWT).
    @GetMapping("api/me")
    public ResponseEntity<UserDTO> getAuthenticatedUser(Authentication authentication) {

        // 1. Verificamos se o usuário está autenticado
        if (authentication == null || !authentication.isAuthenticated()) {
            return new  ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 2. Pegamos o ID do usuário, que é o "subject" do token
        // (Exatamente como é defindo no /api/login)
        String userIdString = authentication.getName();
        Integer userId;

        try {
            userId = Integer.valueOf(userIdString);     // Convertendo o ID (String) para Integer
        } catch (NumberFormatException e) {
            // Se o subject do token não for um número, é um token inválido
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 3. Buscamos a entidade 'Usuarios' completa do banco pelo ID
        Usuarios usuario = usuariosRepository.findById((int) userId.longValue())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com ID: " + userId));

        // 4. Mapeamos a entidade 'Usuarios' para UserDTO (só os dados seguros, sem senha por exemplo)
        UserDTO userDTO = new UserDTO();
        userDTO.setId(usuario.getId());
        userDTO.setNome(usuario.getNome());
        userDTO.setCargo(usuario.getCargo());
        userDTO.setIdade(usuario.getIdade());
        userDTO.setCidade(usuario.getCidade());
        userDTO.setCorporativa(usuario.getCorporativa());

        // 5. Retornamos o DTO para o frontend
        return ResponseEntity.ok(userDTO);
    }
}

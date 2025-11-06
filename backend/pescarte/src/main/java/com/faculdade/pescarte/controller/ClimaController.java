package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.dto.ClimaDTO;
import org.springframework.web.bind.annotation.*;
import com.faculdade.pescarte.service.ClimaService;

@RestController
@RequestMapping("/api/clima")
@CrossOrigin(origins = "*")             // Serve para permitir conexão de domínio cruzado (possibilita conexão front e back)
public class ClimaController {
    private final ClimaService climaService;

    // Construtor
    public ClimaController(ClimaService climaService) {
        this.climaService = climaService;
    }

    // GET
    @GetMapping         // Sem o ("/api/clima")
    public ClimaDTO getClima(@RequestParam("cidade") String nomeCidade) {
        // Agora tenho a variável `nomeCidade` (ex: "Rio de Janeiro")
        // Vou usá-la para chamar a API de clima externa
        // O Spring vai converter o ClimaDTO para JSON automaticamente
        return climaService.buscarClima(nomeCidade);
    }
}

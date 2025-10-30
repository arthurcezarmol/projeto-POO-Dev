package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.dto.ClimaDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.faculdade.pescarte.service.ClimaService;

@RestController
@RequestMapping("/api/clima")
public class ClimaController {
    private final ClimaService climaService;

    // Construtor
    public ClimaController(ClimaService climaService) {
        this.climaService = climaService;
    }

    // GET
    @GetMapping
    public ClimaDTO getClima() {
        // O Spring vai converter o ClimaDTO para JSON automaticamente
        return climaService.buscarClima();
    }
}

package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.model.Servicos;
import com.faculdade.pescarte.service.ServicosService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/servicos")         // URL base do controller
public class ServicosController {

    private final ServicosService servicosService;

    public ServicosController(ServicosService servicosService) {
        this.servicosService = servicosService;
    }

    // Endpoint para listar todos os serviços
    // O frontend (mapa) chamará este metodo
    // URL: GET http://localhost:8080/api/servicos
    @GetMapping
    public List<Servicos> listarTodosServicos() {
        return servicosService.listarServicos();
    }
}

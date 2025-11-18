package com.faculdade.pescarte.service;

import com.faculdade.pescarte.model.Servicos;
import com.faculdade.pescarte.repository.ServicosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicosService {

    private final ServicosRepository servicosRepository;

    // Injeção de dependência via construtor
    public ServicosService(ServicosRepository servicosRepository) {
        this.servicosRepository = servicosRepository;
    }

    // Buscar os serviços cadastrados no banco de dados (por hora somente planilhas)
    // e retorna (return) a uma lista de serviços
    public List<Servicos> listarServicos() {
        return servicosRepository.findAll();
    }
}

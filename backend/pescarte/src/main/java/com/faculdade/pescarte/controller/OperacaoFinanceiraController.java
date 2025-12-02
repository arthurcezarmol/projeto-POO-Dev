package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.dto.OperacaoFinanceiraDTO;
import com.faculdade.pescarte.service.OperacaoFinanceiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financeiro")
public class OperacaoFinanceiraController {

    @Autowired
    private OperacaoFinanceiraService service;

    @PostMapping("/salvar")
    public ResponseEntity<OperacaoFinanceiraDTO> salvar(@RequestBody OperacaoFinanceiraDTO dto) {
        // Obter o usuário logado do contexto de segurança
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();
        Integer userId = Integer.parseInt(userIdString);

        OperacaoFinanceiraDTO salvo = service.salvarOperacao(dto, userId);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/historico")
    public ResponseEntity<List<OperacaoFinanceiraDTO>> historico() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();
        Integer userId = Integer.parseInt(userIdString);

        List<OperacaoFinanceiraDTO> historico = service.listarPorUsuario(userId);
        return ResponseEntity.ok(historico);
    }
}

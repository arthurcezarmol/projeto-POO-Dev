package com.faculdade.pescarte.controller;

import com.faculdade.pescarte.model.Peixes;
import com.faculdade.pescarte.service.PeixesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peixes")
public class PeixesController {
    private final PeixesService peixesService;

    // Construtor
    public PeixesController(PeixesService peixesService) {
        this.peixesService = peixesService;
    }

    // Metodos
    // Metodo GET para ver a lista de peixes
    @GetMapping // sem endpoint. Se não passar nada aqui ele chama o metodo por padrão quando /api/peixes for acessada
    public List<Peixes> listarPeixes() {
        return peixesService.listarPeixes();
    }

    // Metodo GET para passar o ID e me retornar o peixe
    @GetMapping("/{id}")
    public ResponseEntity<Peixes> buscarPeixesPorId(@PathVariable Long id) {
        return peixesService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Metodo POST para inserir no banco de dados
    @PostMapping
    public Peixes salvarPeixes (@RequestBody Peixes peixes) {
        return peixesService.salvarPeixes(peixes);
    }

    // Metodo DELETE para deletar no banco de dados
    @DeleteMapping("{id}")         // deletar por id
    public ResponseEntity<Void> excluirPeixes(@PathVariable Long id) {
        peixesService.excluirPeixes(id);
        return ResponseEntity.noContent().build();
    }
}

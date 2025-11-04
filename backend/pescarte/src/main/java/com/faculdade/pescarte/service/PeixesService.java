package com.faculdade.pescarte.service;

import com.faculdade.pescarte.model.Peixes;
import com.faculdade.pescarte.repository.PeixesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeixesService {

    // Criando um repositório
    private final PeixesRepository peixesRepository;

    // Construtor da classe
    public PeixesService(PeixesRepository peixesRepository) {
        this.peixesRepository = peixesRepository;
    }

    // Métodos
    // Metodo para mostrar todos os peixes
    public List<Peixes> listarPeixes(){
        return peixesRepository.findAll();
    }

    // OPERAÇÕES REST

    // Metodo para buscar um peixe pelo id
    public Optional<Peixes> findById(Long id) {
        return peixesRepository.findById(id);
    }

    // Metodo para salvar/cadastrar um peixe
    public Peixes salvarPeixes(Peixes peixes) {
        return peixesRepository.save(peixes);
    }

    // Metodo para deletar/remover um peixe pelo id
    public void excluirPeixes(Long id) {
        peixesRepository.deleteById(id);
    }
}

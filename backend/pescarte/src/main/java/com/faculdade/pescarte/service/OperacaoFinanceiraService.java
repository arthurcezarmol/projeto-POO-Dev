package com.faculdade.pescarte.service;

import com.faculdade.pescarte.dto.OperacaoFinanceiraDTO;
import com.faculdade.pescarte.model.OperacaoFinanceira;
import com.faculdade.pescarte.model.Usuarios;
import com.faculdade.pescarte.repository.OperacaoFinanceiraRepository;
import com.faculdade.pescarte.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OperacaoFinanceiraService {

    @Autowired
    private OperacaoFinanceiraRepository repository;

    @Autowired
    private UsuariosRepository usuariosRepository;

    public OperacaoFinanceiraDTO salvarOperacao(OperacaoFinanceiraDTO dto, Integer userId) {
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + userId));

        OperacaoFinanceira operacao = new OperacaoFinanceira();
        operacao.setUsuario(usuario);
        operacao.setTipoVenda(dto.getTipoVenda());
        operacao.setNomePeixe(dto.getNomePeixe());
        operacao.setPeso(dto.getPeso());
        operacao.setPrecoUnitario(dto.getPrecoUnitario());
        operacao.setValorTotal(dto.getValorTotal());
        operacao.setDataOperacao(LocalDateTime.now());

        OperacaoFinanceira salvo = repository.save(operacao);

        dto.setId(salvo.getId());
        dto.setDataOperacao(salvo.getDataOperacao());
        return dto;
    }

    public List<OperacaoFinanceiraDTO> listarPorUsuario(Integer userId) {
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + userId));

        return repository.findByUsuarioIdOrderByDataOperacaoDesc(usuario.getId()).stream()
                .map(op -> new OperacaoFinanceiraDTO(
                        op.getId(),
                        op.getTipoVenda(),
                        op.getNomePeixe(),
                        op.getPeso(),
                        op.getPrecoUnitario(),
                        op.getValorTotal(),
                        op.getDataOperacao()))
                .collect(Collectors.toList());
    }
}

package com.faculdade.pescarte.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperacaoFinanceiraDTO {
    private Long id;
    private String tipoVenda;
    private String nomePeixe;
    private Double peso;
    private Double precoUnitario;
    private Double valorTotal;
    private LocalDateTime dataOperacao;
}

package com.faculdade.pescarte.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "operacoes_financeiras")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperacaoFinanceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuarios usuario;

    @Column(name = "tipo_venda", nullable = false)
    private String tipoVenda; // "direto" ou "atacado"

    @Column(name = "nome_peixe", nullable = false)
    private String nomePeixe;

    @Column(name = "peso", nullable = false)
    private Double peso;

    @Column(name = "preco_unitario", nullable = false)
    private Double precoUnitario;

    @Column(name = "valor_total", nullable = false)
    private Double valorTotal;

    @Column(name = "data_operacao", nullable = false)
    private LocalDateTime dataOperacao;
}

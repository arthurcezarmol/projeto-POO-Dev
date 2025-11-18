package com.faculdade.pescarte.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "servicos")           // nome da tabela no PostgreSQL
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Servicos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servico")
    private Long id;            // ver se trocar pra int depois

    @Column(name = "tiposervico")
    private String tipo;

    private String nome;
    private String categoria;
    private String telefone;
    private String descricao;

    // Nossas colunas cruciais para o mapa
    private double latitude;
    private double longitude;
}

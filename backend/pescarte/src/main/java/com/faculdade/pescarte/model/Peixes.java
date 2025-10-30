package com.faculdade.pescarte.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "peixes")
@Data
public class Peixes {
    // Atributos (colunas do banco de dados)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    String tipoPescado;
    float pesoPescado;
    float valorPescado;
}

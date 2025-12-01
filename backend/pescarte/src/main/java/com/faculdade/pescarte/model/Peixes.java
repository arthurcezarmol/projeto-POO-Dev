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
    @Column(name = "id_peixe")          // A coluna do banco se chama exatamente "id_peixe"
    private Long id;

    // Mapeando as colunas do banco de dados no código usando @Column
    @Column(name = "tipopescado")       // A coluna do banco se chama exatamente "tipopescado"
    String tipoPescado;

    @Column(name = "pesopescado")       // A coluna do banco se chama exatamente "pesopescado"
    Float pesoPescado;

    @Column(name = "valor_pescado_atacado")      // A coluna do banco se chama exatamente "valor_pescado_atacado"
    Float valorAtacado;

    @Column(name = "valor_pescado_direto")      // A coluna do banco se chama exatamente "valor_pescado_direto"
    Float valorDireto;
}

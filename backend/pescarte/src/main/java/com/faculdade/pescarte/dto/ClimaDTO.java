package com.faculdade.pescarte.dto;

import lombok.Data;

// public record ClimaDTO(String cidade, Double temperatura, String descricao) { }
//  Clima DTO ==> O nome do campo (o Java cria o getter: .descricao())
//  record ==> O nome do seu DTO
//  public ==> Declaração do record

// DTO = Data Transfer Object

// Classe mais completa (vai pegar mais informações da API)
@Data           // @Data é do lombok para criar os getters e setters automaticamente
public class ClimaDTO {
    private String cidade;
    private String pais;
    private double temperatura;
    private int umidade;
    private int pressao;
    private String descricao;
    private double velocidadeVento;
    private double direcaoVento;
    private int nebulosidade;
}

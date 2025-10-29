package com.faculdade.pescarte.dto;

// public record ClimaDTO(String cidade, Double temperatura, String descricao) { }
//  Clima DTO ==> O nome do campo (o Java cria o getter: .descricao())
//  record ==> O nome do seu DTO
//  public ==> Declaração do record

public record ClimaDTO(String cidade, Double temperatura, String descricao) {
    // O record cuida de tudo
}

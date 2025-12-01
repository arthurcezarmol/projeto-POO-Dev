package com.faculdade.pescarte.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Integer id;
    private String nome;
    private String cargo;
    private int idade;
    private String cidade;
    private String corporativa;
}

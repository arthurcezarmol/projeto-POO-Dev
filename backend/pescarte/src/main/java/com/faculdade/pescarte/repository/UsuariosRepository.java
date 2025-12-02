package com.faculdade.pescarte.repository;

import com.faculdade.pescarte.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

    /*
     * USANDO JPA:
     * A QUERY CUSTOMIZADA PARA LOGIN:
     * O Spring "lê" o nome deste metodo e automaticamente escreve a query SQL:
     * "SELECT * FROM usuarios WHERE nome = ?"
     * Optional<Usuarios> findByNome(String nome); // Metodo para encontrar o
     * usuario pelo nome
     * Optional<Usuarios> findByCargo(String cargo); // Metodo para encontrar o
     * usuario pelo cargo
     */

    // Usando JPQL:
    /*
     * Esta é a forma JPQL de escrever "findByNome".
     * "Usuarios" é o nome da @Entity (classe).
     * "u.nome" é o nome do atributo 'nome' dentro da classe.
     * ":nomeParam" é o nome do parâmetro que ligamos com @Param.
     */
    @Query("SELECT u FROM Usuarios u WHERE u.nome = :nomeParam")
    Optional<Usuarios> findByUsername(@Param("nomeParam") String nome);

    @Query("SELECT u FROM Usuarios u WHERE u.cargo = :cargoParam")
    Optional<Usuarios> findByCargo(@Param("cargoParam") String cargo);

}

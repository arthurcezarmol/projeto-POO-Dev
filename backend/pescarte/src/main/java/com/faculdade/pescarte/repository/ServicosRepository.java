package com.faculdade.pescarte.repository;

import com.faculdade.pescarte.model.Servicos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicosRepository extends JpaRepository<Servicos,Long> {

    // Consulta JPQL para buscar o servico por tipo:
    @Query("SELECT s FROM Servicos s WHERE s.tipo =: tipoParam")
    List<Servicos> findByTipo(@Param("tipoParam") String tipo);
}

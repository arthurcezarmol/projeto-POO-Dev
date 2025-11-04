package com.faculdade.pescarte.repository;

import com.faculdade.pescarte.model.Peixes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeixesRepository extends JpaRepository<Peixes, Long> {
    // Spring JPA cria os metodos
}

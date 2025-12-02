package com.faculdade.pescarte.repository;

import com.faculdade.pescarte.model.OperacaoFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperacaoFinanceiraRepository extends JpaRepository<OperacaoFinanceira, Long> {
    List<OperacaoFinanceira> findByUsuarioIdOrderByDataOperacaoDesc(Integer usuarioId);
}

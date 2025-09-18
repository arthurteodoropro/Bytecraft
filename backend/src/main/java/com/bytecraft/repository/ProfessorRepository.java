package com.bytecraft.repository;

import com.bytecraft.model.Professor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByNomeDeUsuario(String nomeDeUsuario);

    Optional<Professor> findBySala_NomeTurma(String nomeTurma);
}

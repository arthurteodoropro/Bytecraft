package com.bytecraft.repository;

import com.bytecraft.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByNomeDeUsuario(String nomeDeUsuario);

    List<Professor> findBySala_Id(Long salaId);

}

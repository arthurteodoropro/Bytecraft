package com.bytecraft.repository;

import com.bytecraft.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalaRepository extends JpaRepository<Sala, Long> {

    // busca pelo código da sala (agora do tipo Byte)
    Optional<Sala> findByCodigo(Byte codigo);
}

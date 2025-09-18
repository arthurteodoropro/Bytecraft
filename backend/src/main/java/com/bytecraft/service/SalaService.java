package com.bytecraft.service;

import com.bytecraft.model.Sala;
import com.bytecraft.repository.SalaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;


import java.util.Random;

@Service
@RequiredArgsConstructor
public class SalaService {

    private final SalaRepository salaRepository;

    public Byte geraCodigo() {
        return (byte) new Random().nextInt(100); // 0-99
    }

    // Novo método: busca por nome
    public Optional<Sala> getSalaByNome(String nomeTurma) {
        return salaRepository.findByNomeTurma(nomeTurma);
    }

    // Modificado para não criar duplicada
    public Sala criaSala(String nomeTurma) {
        return salaRepository.findByNomeTurma(nomeTurma)
                .orElseGet(() -> {
                    Sala nova = Sala.builder()
                            .nomeTurma(nomeTurma)
                            .codigo(geraCodigo())
                            .build();
                    return salaRepository.save(nova);
                });
    }

    public Optional<Sala> getSalaById(Long id) { return salaRepository.findById(id); }
}

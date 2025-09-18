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

    public Sala criaSala(String nomeTurma) {
        Sala sala = Sala.builder()
                .nomeTurma(nomeTurma)
                .codigo(geraCodigo())
                .build();
        Sala saved = salaRepository.save(sala);
        salaRepository.flush(); // garante insert imediato
        return saved;
    }

    public Optional<Sala> getSalaById(Long id) {
    return salaRepository.findById(id);
}
}

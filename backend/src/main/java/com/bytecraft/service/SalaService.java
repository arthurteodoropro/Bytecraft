package com.bytecraft.service;

import com.bytecraft.model.Sala;
import com.bytecraft.repository.SalaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalaService {

    private final SalaRepository salaRepository;

    private Byte geraCodigo() {
        // Gera um número entre 0 e 99
        return (byte) new Random().nextInt(100);
    }

    public Optional<Sala> buscarPorCodigo(Byte codigo) {
        return salaRepository.findByCodigo(codigo);
    }

    @Transactional
    public Sala criaSala(String nomeTurma) {
        Sala sala = Sala.builder()
                .codigo(geraCodigo())
                .nomeTurma(nomeTurma)
                .build();

        Sala saved = salaRepository.save(sala); // persiste
        salaRepository.flush(); // garante que o insert vá para o banco imediatamente
        return saved;
    }
}

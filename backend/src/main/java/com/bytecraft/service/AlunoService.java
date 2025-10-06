package com.bytecraft.service;

import com.bytecraft.enums.NivelDificuldadeEnum;
import com.bytecraft.model.Aluno;
import com.bytecraft.model.Sala;
import com.bytecraft.repository.AlunoRepository;
import com.bytecraft.repository.SalaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final SalaRepository salaRepository;

    // 🔹 Método utilitário interno para limpar e normalizar textos
    private String normalizar(String texto) {
        return texto == null ? null : texto.trim().replaceAll("\\s+", " ");
    }

    // 🔹 Vincula aluno à sala (cria se não existir)
    public Aluno vincularAlunoASala(String apelido, Byte codigoSala) {
        // Normaliza o apelido
        String apelidoNormalizado = normalizar(apelido);

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        // Busca aluno já existente (apelido normalizado)
        Optional<Aluno> existente = alunoRepository.buscarPorApelidoESala(apelidoNormalizado, sala);
        if (existente.isPresent()) return existente.get();

        // Cria novo aluno com apelido normalizado
        Aluno novo = new Aluno();
        novo.setApelido(apelidoNormalizado);
        novo.setSala(sala);
        return alunoRepository.save(novo);
    }

    @Transactional
    public boolean registraNivel(NivelDificuldadeEnum nivel, String apelido, Byte codigoSala) {
        // Normaliza apelido antes de buscar
        String apelidoNormalizado = normalizar(apelido);

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        return alunoRepository.buscarPorApelidoESala(apelidoNormalizado, sala)
                .map(aluno -> {
                    aluno.setNivel(nivel);
                    alunoRepository.save(aluno); // persiste a alteração
                    return true;
                })
                .orElse(false);
    }

    // 🔹 Busca aluno em uma sala (apelido também normalizado)
    public Aluno findAluno(String apelido, Byte codigoSala) {
        String apelidoNormalizado = normalizar(apelido);

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        return alunoRepository.buscarPorApelidoESala(apelidoNormalizado, sala)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }
}

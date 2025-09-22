package com.bytecraft.service;

import com.bytecraft.model.Aluno;
import com.bytecraft.model.Sala;
import com.bytecraft.repository.AlunoRepository;
import com.bytecraft.repository.SalaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final SalaRepository salaRepository;

    public Optional<Aluno> vincularAlunoASala(String apelido, Byte codigoSala) {
        Aluno aluno = alunoRepository.findById(apelido).orElseGet(() -> {
            Aluno novo = new Aluno();
            novo.setApelido(apelido);
            return alunoRepository.save(novo);
        });

        Sala sala = salaRepository.findByCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        aluno.setSala(sala);
        alunoRepository.save(aluno);

        return Optional.of(aluno);
    }

    public void registraNivel(Aluno aluno) {
        alunoRepository.atualizaNivel(aluno);
    }

    // Novo método público
    public Aluno findAluno(String apelido) {
        return alunoRepository.findById(apelido)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }
}

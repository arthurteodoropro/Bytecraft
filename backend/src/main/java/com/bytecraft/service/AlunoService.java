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
        Optional<Aluno> alunoOpt = alunoRepository.findById(apelido);
        Optional<Sala> salaOpt = salaRepository.findByCodigo(codigoSala);

        if (alunoOpt.isEmpty() || salaOpt.isEmpty()) {
            return Optional.empty(); // aluno ou sala não existe
        }

        Aluno aluno = alunoOpt.get();
        Sala sala = salaOpt.get();

        if (aluno.getSala() != null) {
            if (aluno.getSala().getCodigo().equals(codigoSala)) {
                // aluno já está vinculado a esta sala, retorna normalmente
                return Optional.of(aluno);
            } else {
                // aluno já está vinculado a outra sala, não permite
                throw new IllegalStateException("Aluno já está vinculado a outra sala.");
            }
        }

        // aluno ainda não está vinculado a nenhuma sala
        aluno.setSala(sala);
        alunoRepository.save(aluno);
        return Optional.of(aluno);
    }

    public void registraNivel(Aluno aluno) {
        alunoRepository.atualizaNivel(aluno);
    }
}

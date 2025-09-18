package com.bytecraft.service;

import com.bytecraft.model.Professor;
import com.bytecraft.model.Sala;
import com.bytecraft.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final PasswordEncoder passwordEncoder;
    private final SalaService salaService;

    @Transactional
    public Professor cadastrarProfessor(Professor professor, String nomeTurma) {
        if (nomeTurma != null && !nomeTurma.isBlank()) {
            // Cria e persiste a sala
            Sala sala = salaService.criaSala(nomeTurma);
            professor.setSala(sala);
        }

        // Criptografa a senha
        professor.setSenha(passwordEncoder.encode(professor.getSenha()));

        // Salva o professor com a sala vinculada
        return professorRepository.save(professor);
    }

    public Optional<Professor> autenticarProfessor(String nomeDeUsuario, String senha) {
        return professorRepository.findByNomeDeUsuario(nomeDeUsuario)
                .filter(professor -> passwordEncoder.matches(senha, professor.getSenha()));
    }
}

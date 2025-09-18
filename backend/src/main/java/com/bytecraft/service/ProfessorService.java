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

    @Transactional
    public Professor cadastrarProfessor(Professor professor) {
        professor.setSenha(passwordEncoder.encode(professor.getSenha()));
        return professorRepository.save(professor);
    }
    


    public Optional<Professor> autenticarProfessor(String nomeDeUsuario, String senha) {
        return professorRepository.findByNomeDeUsuario(nomeDeUsuario)
                .filter(p -> passwordEncoder.matches(senha, p.getSenha()));
    }
}

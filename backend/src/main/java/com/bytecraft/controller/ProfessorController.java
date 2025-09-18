package com.bytecraft.controller;

import com.bytecraft.model.Professor;
import com.bytecraft.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/professores")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorService professorService;

    // Endpoint para cadastrar professor
    @PostMapping("/cadastrar")
    public ResponseEntity<Professor> cadastrar(@RequestBody Professor professor) {
        String nomeTurma = professor.getSala() != null ? professor.getSala().getNomeTurma() : null;

        Professor cadastrado = professorService.cadastrarProfessor(professor, nomeTurma);
        return ResponseEntity.ok(cadastrado);
    }

    // Endpoint para autenticar professor
    @PostMapping("/autenticar")
    public ResponseEntity<Professor> autenticar(@RequestBody Professor professor) {
        String nomeDeUsuario = professor.getNomeDeUsuario();
        String senha = professor.getSenha();

        Optional<Professor> professorOpt = professorService.autenticarProfessor(nomeDeUsuario, senha);

        return professorOpt.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(401).build());
    }
}

package com.bytecraft.controller;

import com.bytecraft.model.Professor;
import com.bytecraft.model.Sala;
import com.bytecraft.dto.ProfessorRequest;
import com.bytecraft.service.ProfessorService;
import com.bytecraft.service.SalaService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/professores")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorService professorService;
    private final SalaService salaService; // injetar aqui

    @PostMapping("/cadastrar")
    public ResponseEntity<Professor> cadastrar(@RequestBody ProfessorRequest request) {
        Sala sala = salaService.getSalaById(request.getSalaId())
                .orElseThrow(() -> new IllegalArgumentException("Sala não encontrada"));

        Professor professor = new Professor();
        professor.setNomeDeUsuario(request.getNomeDeUsuario());
        professor.setSenha(request.getSenha());
        professor.setSala(sala);

        Professor cadastrado = professorService.cadastrarProfessor(professor, sala.getNomeTurma());
        return ResponseEntity.ok(cadastrado);
    }

    @PostMapping("/autenticar")
    public ResponseEntity<Professor> autenticar(@RequestBody Professor professor) {
        Optional<Professor> professorOpt = professorService.autenticarProfessor(
                professor.getNomeDeUsuario(),
                professor.getSenha()
        );
        return professorOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).build());
    }
}

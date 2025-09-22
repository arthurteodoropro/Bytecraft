package com.bytecraft.controller;

import com.bytecraft.model.Aluno;
import com.bytecraft.model.Sala;
import com.bytecraft.service.AlunoService;
import com.bytecraft.service.SalaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/salas")
@RequiredArgsConstructor
public class SalaController {

    private final SalaService salaService;
    private final AlunoService alunoService;

    // Endpoint para criar sala
    @PostMapping("/criar")
    public ResponseEntity<Sala> criarSala(@RequestParam String nomeTurma) {
        Sala sala = salaService.criaSala(nomeTurma);
        return ResponseEntity.ok(sala);
    }

    // Endpoint para vincular ou criar aluno em uma sala
    @PostMapping("/vincular")
    public ResponseEntity<Aluno> vincularAluno(@RequestParam String apelido,
                                            @RequestParam String codigoSala) {
        try {
            Byte codigo = Byte.parseByte(codigoSala); // converte para Byte
            Aluno aluno = alunoService.vincularAlunoASala(apelido, codigo)
                                    .orElseThrow(() -> new RuntimeException("Erro ao vincular aluno à sala"));
            return ResponseEntity.ok(aluno);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null); // código inválido
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // sala não encontrada ou outro erro
        }
    }

}

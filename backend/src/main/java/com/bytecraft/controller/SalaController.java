package com.bytecraft.controller;

import com.bytecraft.model.Aluno;
import com.bytecraft.model.Sala;
import com.bytecraft.service.AlunoService;
import com.bytecraft.service.SalaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    // Endpoint para vincular aluno a uma sala
    @PostMapping("/vincular")
    public ResponseEntity<Aluno> vincularAluno(@RequestParam String apelido,
                                               @RequestParam String codigoSala) {
        try {
            Byte codigo = Byte.parseByte(codigoSala); // converte para Byte
            Optional<Aluno> alunoOpt = alunoService.vincularAlunoASala(apelido, codigo);
            return alunoOpt.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null); // código inválido
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(null); // aluno já vinculado a outra sala
        }
    }
}

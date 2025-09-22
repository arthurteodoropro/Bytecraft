package com.bytecraft.controller;

import com.bytecraft.enums.NivelDificuldadeEnum;
import com.bytecraft.model.Aluno;
import com.bytecraft.service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;

    // Login ou registro
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
    try {
        String apelido = payload.get("apelido");
        String codigoSalaStr = payload.get("codigoSala");

        if (apelido == null || apelido.isBlank())
            return ResponseEntity.badRequest().body("Apelido é obrigatório");
        if (codigoSalaStr == null || codigoSalaStr.isBlank())
            return ResponseEntity.badRequest().body("Código da sala é obrigatório");

        Byte codigoSala = Byte.valueOf(codigoSalaStr);

        Aluno aluno = alunoService.vincularAlunoASala(apelido, codigoSala)
                .orElseThrow(() -> new RuntimeException("Erro ao vincular aluno à sala"));

        return ResponseEntity.ok(aluno);

    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Erro no login: " + e.getMessage());
    }
}
    // Retorna níveis disponíveis
    @GetMapping("/niveis")
    public ResponseEntity<?> getNiveis() {
        return ResponseEntity.ok(List.of(
                NivelDificuldadeEnum.FACIL,
                NivelDificuldadeEnum.MEDIO,
                NivelDificuldadeEnum.DIFICIL
        ));
    }

    // Atualiza nível do aluno
    @PostMapping("/{apelido}/registrarNivel")
    public ResponseEntity<?> registrarNivel(@PathVariable String apelido, @RequestBody Map<String, String> payload) {
        try {
            String nivelStr = payload.get("nivel");
            if (nivelStr == null || nivelStr.isBlank()) {
                return ResponseEntity.badRequest().body("Nível é obrigatório");
            }

            Aluno aluno = alunoService.findAluno(apelido);
            aluno.setNivel(NivelDificuldadeEnum.valueOf(nivelStr.toUpperCase()));
            alunoService.registraNivel(aluno);

            return ResponseEntity.ok(aluno);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar nível: " + e.getMessage());
        }
    }
}
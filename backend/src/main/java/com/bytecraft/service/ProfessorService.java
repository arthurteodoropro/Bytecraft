package com.bytecraft.service;

import com.bytecraft.model.Professor;
import com.bytecraft.model.Sala;
import com.bytecraft.DTO.ProfessorDTO;
import com.bytecraft.DTO.SalaDTO;
import com.bytecraft.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final SalaService salaService;
    private final PasswordEncoder passwordEncoder;

    // 🔹 Método utilitário para normalizar texto (trim + remover espaços extras internos)
    private String normalizar(String texto) {
        return texto == null ? null : texto.trim().replaceAll("\\s+", " ");
    }

    // Cadastra professor e cria sala se não existir
    public ProfessorDTO cadastrarProfessor(String nome, String senha, String nomeTurma) {
        // Normaliza entradas
        nome = normalizar(nome);
        senha = normalizar(senha); // opcional, mas evita espaços no início/fim
        nomeTurma = normalizar(nomeTurma);

        // Validações básicas
        if (nome == null || nome.isEmpty() || senha == null || senha.isEmpty() || nomeTurma == null || nomeTurma.isEmpty()) {
            throw new IllegalArgumentException("Nome, senha e nome da turma são obrigatórios");
        }
        if (senha.length() < 6) {
            throw new IllegalArgumentException("Senha deve ter no mínimo 6 caracteres");
        }

        // Verifica duplicidade
        if (professorRepository.buscarPorNome(nome) != null) {
            throw new IllegalStateException("Nome de usuário já existe");
        }

        // Cria sala associada
        Sala sala = salaService.criaSala(nomeTurma);

        // Cria e persiste professor
        Professor professor = new Professor();
        professor.setNomeDeUsuario(nome);
        professor.setSenha(passwordEncoder.encode(senha));
        professor.setSala(sala);

        professorRepository.salvaProfessor(professor);

        // Retorna DTO garantindo que o código da sala esteja presente
        return new ProfessorDTO(professor.getNomeDeUsuario(), SalaDTO.fromEntity(sala));
    }

    public Professor autenticarProfessor(String nome, String senha) {
        nome = normalizar(nome);
        senha = normalizar(senha);

        if (nome == null || nome.isEmpty() || senha == null || senha.isEmpty()) {
            throw new IllegalArgumentException("Nome e senha são obrigatórios");
        }

        Professor professor = professorRepository.buscarPorNome(nome);
        if (professor != null && passwordEncoder.matches(senha, professor.getSenha())) {
            return professor;
        }
        return null;
    }
}

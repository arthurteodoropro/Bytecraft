package com.bytecraft.service;

import com.bytecraft.enums.NivelDificuldadeEnum;
import com.bytecraft.model.Aluno;
import com.bytecraft.model.Sala;
import com.bytecraft.repository.AlunoRepository;
import com.bytecraft.repository.SalaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

//import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final SalaRepository salaRepository;
    //private final JdbcTemplate jdbcTemplate; 


    //Vincula aluno à sala (cria se não existir)
    public Aluno vincularAlunoASala(String apelido, Byte codigoSala) {
        String apelidoTrim = apelido != null ? apelido.trim() : null;

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        Optional<Aluno> existente = alunoRepository.buscarPorApelidoESala(apelidoTrim, sala);
        if (existente.isPresent()) return existente.get();

        Aluno novo = new Aluno();
        novo.setApelido(apelidoTrim);
        novo.setSala(sala);
        novo.setPontuacao(0);
        return alunoRepository.save(novo);
    }

    @Transactional
    public boolean registraNivel(NivelDificuldadeEnum nivel, String apelido, Byte codigoSala) {
        String apelidoTrim = apelido != null ? apelido.trim() : null;

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        return alunoRepository.buscarPorApelidoESala(apelidoTrim, sala)
                .map(aluno -> {
                    aluno.setNivel(nivel);
                    alunoRepository.save(aluno);
                    return true;
                })
                .orElse(false);
    }

    //Busca aluno em uma sala
    public Aluno findAluno(String apelido, Byte codigoSala) {
        String apelidoTrim = apelido != null ? apelido.trim() : null;

        Sala sala = salaRepository.buscarPorCodigo(codigoSala)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        return alunoRepository.buscarPorApelidoESala(apelidoTrim, sala)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }


    /*public int calculaPontuacao(NivelDificuldadeEnum nivel, int tentativa, int pontos, int segundos) {
        double multiplicadorRN10;
    
        // === RN10: Redução conforme nível e tentativa ===
        switch (nivel) {
            case FACIL:
                switch (tentativa) {
                    case 0: multiplicadorRN10 = 1.0; break;  // 1ª tentativa
                    case 1: multiplicadorRN10 = 1.0; break;  // 2ª tentativa (aviso)
                    case 2: multiplicadorRN10 = 0.8; break;  // 3ª tentativa (dica)
                    case 3: multiplicadorRN10 = 0.5; break;  // 4ª tentativa (ilumina)
                    default: multiplicadorRN10 = 0.0; break;
                }
                break;
    
            case MEDIO:
                switch (tentativa) {
                    case 0: multiplicadorRN10 = 1.0; break;
                    case 1: multiplicadorRN10 = 0.95; break;
                    case 2: multiplicadorRN10 = 0.9; break;
                    case 3: multiplicadorRN10 = 0.8; break;
                    case 4: multiplicadorRN10 = 0.7; break;
                    default: multiplicadorRN10 = 0.0; break;
                }
                break;
    
            case DIFICIL:
                switch (tentativa) {
                    case 0: multiplicadorRN10 = 1.0; break;
                    case 1: multiplicadorRN10 = 0.9; break;
                    case 2: multiplicadorRN10 = 0.85; break;
                    case 3: multiplicadorRN10 = 0.75; break;
                    case 4: multiplicadorRN10 = 0.6; break;
                    default: multiplicadorRN10 = 0.0; break;
                }
                break;
    
            default:
                throw new IllegalArgumentException("Nível inválido: " + nivel);
        }
    
        // === RN22: Bônus de tempo ===
        // Fórmula: X * max(1, (2 - T/600))
        double tempoFator = Math.max(1.0, 2.0 - ((double) segundos / 600.0));
    
        // === Pontuação final ===
        double pontuacaoFinal = pontos * multiplicadorRN10 * tempoFator;
    
        return (int) Math.round(pontuacaoFinal);
    }*/
    

    

    /*public boolean registraPontuacao(String apelido, int segundos, int pontuacaoBase, Sala sala) {
        try {
            Aluno aluno = alunoRepository.buscarPorApelidoESala(apelido, sala)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            NivelDificuldadeEnum nivel = aluno.getNivel();

            int pontuacaoCalculada = calculaPontuacao(nivel, segundos, pontuacaoBase);

            // Atualiza pontuação e segundos
            String query = "UPDATE alunos SET segundos = ?, pontuacao = ? WHERE id = ?";
            int rowsUpdated = jdbcTemplate.update(query, segundos, pontuacaoCalculada, aluno.getId());

            alunoRepository.save(aluno);

            return rowsUpdated > 0;
        } catch (Exception e) {
            System.err.println("Erro ao registrar pontuação: " + e.getMessage());
            return false;
        }
    }*/

    // Buscar alunos por sala
    public Optional<List<Aluno>> getAlunosPorSala(Long id){
        return alunoRepository.buscarPorSala(id);
    }
}

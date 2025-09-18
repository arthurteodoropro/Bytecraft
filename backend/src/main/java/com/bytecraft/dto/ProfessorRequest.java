package com.bytecraft.dto;

import lombok.Data;

@Data
public class ProfessorRequest {
    private String nomeDeUsuario;
    private String senha;
    private Long salaId; // recebe o id da sala
}

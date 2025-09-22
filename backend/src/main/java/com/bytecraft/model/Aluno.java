package com.bytecraft.model;

import com.bytecraft.enums.NivelDificuldadeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Aluno {

    @Id
    private String apelido;  // apelido agora é único globalmente

    @Enumerated(EnumType.STRING)
    private NivelDificuldadeEnum nivel;

    @ManyToOne
    @JoinColumn(name = "sala_id")
    private Sala sala;  // sala continua, mas apelido não depende da sala
}

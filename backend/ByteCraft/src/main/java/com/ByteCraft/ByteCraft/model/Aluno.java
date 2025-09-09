package com.ByteCraft.ByteCraft.model;

import com.ByteCraft.ByteCraft.enums.NivelDificuldadeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Aluno {

    @Id
    private String apelido;

    @Enumerated(EnumType.STRING)
    private NivelDificuldadeEnum nivel;
}

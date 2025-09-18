package com.bytecraft.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "salas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Byte codigo;  // tipo Byte

    @Column(nullable = false)
    private String nomeTurma;
}

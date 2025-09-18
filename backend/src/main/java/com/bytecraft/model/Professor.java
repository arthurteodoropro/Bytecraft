package com.bytecraft.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nomeDeUsuario;

    @Column(nullable = false)
    private String senha;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sala_id")
    private Sala sala;
}

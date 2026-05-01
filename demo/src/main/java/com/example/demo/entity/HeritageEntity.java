package com.example.demo.entity;


import com.example.demo.enums.HeritageTipes;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "heritage_Entity")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class HeritageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "heritage_seq")
    @SequenceGenerator(name = "heritage_seq", sequenceName = "heritage_sequence", allocationSize = 1)
    private Integer id;


    @Enumerated(EnumType.STRING)
    private HeritageTipes heritageTipes;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private boolean enable;



    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"heritageEntities", "incomeEntities", "expenseEntities", "password"})
    private UserEntity user;
}

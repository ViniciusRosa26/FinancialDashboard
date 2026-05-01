package com.example.demo.entity;


import com.example.demo.enums.IncomeTipes;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "income_Entity")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class IncomeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "income_seq")
    @SequenceGenerator(name = "income_seq", sequenceName = "income_sequence", allocationSize = 1)
    private Integer id;


    @Enumerated(EnumType.STRING)
    private IncomeTipes incomeTipes;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private boolean enable;



    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"heritageEntities", "incomeEntities", "expenseEntities", "password"})
    private UserEntity user;
}

package com.example.demo.entity;

import com.example.demo.enums.ExpenseTipes;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "expense_Entity")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "expense_seq")
    @SequenceGenerator(name = "expense_seq", sequenceName = "expense_sequence", allocationSize = 1)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private ExpenseTipes expenseTipes;

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

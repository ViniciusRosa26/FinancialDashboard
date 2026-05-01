package com.example.demo.entity;

import com.example.demo.enums.ExpenseTipes;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.Month;
import java.time.Year;
import java.util.Date;

@Entity
@Table(name = "overview_Entity")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OverviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "overview_seq")
    @SequenceGenerator(name = "overview_seq", sequenceName = "overview_sequence", allocationSize = 1)
    private Integer id;

    @Column(nullable = false)
    private Double mensalBalance;

    @Column(nullable = false)
    private Month month;

    @Column(nullable = false)
    private Year year;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"heritageEntities", "incomeEntities", "expenseEntities", "password"})
    private UserEntity user;
}

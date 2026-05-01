package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_Entity")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastName;



    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private LocalDateTime createTime;

    @Column(nullable = false)
    private boolean enable;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<HeritageEntity> heritageEntities;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<IncomeEntity> incomeEntities;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<ExpenseEntity> expenseEntities;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private OverviewEntity overviewEntities;


}

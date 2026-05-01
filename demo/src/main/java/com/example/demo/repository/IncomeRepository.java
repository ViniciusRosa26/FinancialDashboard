package com.example.demo.repository;

import com.example.demo.entity.IncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Integer> {
    List<IncomeEntity> findAllByUserId(Integer userId);

}

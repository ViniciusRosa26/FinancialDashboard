package com.example.demo.repository;

import com.example.demo.entity.OverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Month;
import java.time.Year;
import java.util.Optional;

public interface OverviewRepository extends JpaRepository<OverviewEntity, Integer> {
    Optional<OverviewEntity> findByUserIdAndMonthAndYear(Long userId, Month month, Year year);
}

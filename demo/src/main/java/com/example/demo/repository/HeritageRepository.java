package com.example.demo.repository;

import com.example.demo.entity.HeritageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeritageRepository extends JpaRepository<HeritageEntity, Integer> {
    List<HeritageEntity> findAllByUserId(Integer userId);

}

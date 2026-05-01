package com.example.demo.service;

import com.example.demo.dto.OverviewSummaryDTO;
import com.example.demo.entity.ExpenseEntity;
import com.example.demo.entity.IncomeEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OverviewService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public OverviewSummaryDTO getSummaryByUserId(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new OverviewSummaryDTO(
                user.getId(),
                user.getName() + " " + user.getLastName(),
                calculateUserBalance(userId)
        );
    }

    private double calculateUserBalance(Integer userId) {
        double totalIncomes = incomeRepository.findAllByUserId(userId).stream()
                .filter(IncomeEntity::isEnable)
                .mapToDouble(IncomeEntity::getValue)
                .sum();

        double totalExpenses = expenseRepository.findAllByUserId(userId).stream()
                .filter(ExpenseEntity::isEnable)
                .mapToDouble(ExpenseEntity::getValue)
                .sum();

        return totalIncomes - totalExpenses;
    }
}

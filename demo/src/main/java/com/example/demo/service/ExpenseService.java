package com.example.demo.service;

import com.example.demo.dto.ExpenseDTO;
import com.example.demo.entity.ExpenseEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public void createExpense(ExpenseDTO expenseDTO) {
        UserEntity user = userRepository.findById(expenseDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        ExpenseEntity expenseEntity = ExpenseEntity.builder()
                .expenseTipes(expenseDTO.expenseTipes())
                .name(expenseDTO.name())
                .value(expenseDTO.value())
                .enable(expenseDTO.enable())
                .user(user)
                .build();

        expenseRepository.save(expenseEntity);
    }

    public List<ExpenseEntity> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public ExpenseEntity getExpenseById(Integer id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("expense não encontrado"));
    }

    public void updateExpense(Integer id, ExpenseDTO expenseDTO) {
        ExpenseEntity expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense não encontrado"));

        UserEntity user = userRepository.findById(expenseDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        expense.setExpenseTipes(expenseDTO.expenseTipes());
        expense.setName(expenseDTO.name());
        expense.setValue(expenseDTO.value());
        expense.setEnable(expenseDTO.enable());
        expense.setUser(user);

        expenseRepository.save(expense);
    }

    public void deleteExpense(Integer id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("expense não encontrado");
        }
        expenseRepository.deleteById(id);
    }
}

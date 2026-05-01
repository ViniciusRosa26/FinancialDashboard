package com.example.demo.controller;

import com.example.demo.dto.ExpenseDTO;
import com.example.demo.entity.ExpenseEntity;
import com.example.demo.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseWebController {

    private final ExpenseService expenseService;

    public ExpenseWebController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ExpenseDTO dto) {
        expenseService.createExpense(dto);
        return ResponseEntity.ok("Expense criado com sucesso");
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<ExpenseEntity> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        ExpenseEntity expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable Integer id, @RequestBody ExpenseDTO dto) {
        expenseService.updateExpense(id, dto);
        return ResponseEntity.ok("expense atualizado com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("expense deletado com sucesso");
    }
}

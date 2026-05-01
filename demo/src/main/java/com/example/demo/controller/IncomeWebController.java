package com.example.demo.controller;

import com.example.demo.dto.HeritageDTO;
import com.example.demo.dto.IncomeDTO;
import com.example.demo.entity.HeritageEntity;
import com.example.demo.entity.IncomeEntity;
import com.example.demo.service.HeritageService;
import com.example.demo.service.IncomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incomes")
@CrossOrigin(origins = "*")
public class IncomeWebController {

    private final IncomeService incomeService;

    public IncomeWebController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody IncomeDTO dto) {
        incomeService.createIncome(dto);
        return ResponseEntity.ok("Heritage criado com sucesso");
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<IncomeEntity> incomes = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        IncomeEntity income = incomeService.getIncomeById(id);
        return ResponseEntity.ok(income);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable Integer id, @RequestBody IncomeDTO dto) {
        incomeService.updateIncome(id, dto);
        return ResponseEntity.ok("income atualizado com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.ok("income deletado com sucesso");
    }
}

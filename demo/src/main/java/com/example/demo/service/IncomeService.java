package com.example.demo.service;


import com.example.demo.dto.HeritageDTO;
import com.example.demo.dto.IncomeDTO;
import com.example.demo.entity.HeritageEntity;
import com.example.demo.entity.IncomeEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.HeritageRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor


public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;


    public void createIncome(IncomeDTO incomeDTO) {

        UserEntity user = userRepository.findById(incomeDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        IncomeEntity incomeEntity = IncomeEntity.builder()
                .incomeTipes(incomeDTO.incomeTipes())
                .name(incomeDTO.name())
                .value(incomeDTO.value())
                .enable(incomeDTO.enable())
                .user(user)
                .build();

        incomeRepository.save(incomeEntity);

    }


    public List<IncomeEntity> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public IncomeEntity getIncomeById(Integer id) {
        return incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("income não encontrado"));
    }

    public void updateIncome(Integer id, IncomeDTO incomeDTO) {
        IncomeEntity income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income não encontrado"));

        UserEntity user = userRepository.findById(incomeDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        income.setIncomeTipes(incomeDTO.incomeTipes());
        income.setName(incomeDTO.name());
        income.setValue(incomeDTO.value());
        income.setEnable(incomeDTO.enable());
        income.setUser(user);

        incomeRepository.save(income);
    }

    public void deleteIncome(Integer id) {
        if (!incomeRepository.existsById(id)) {
            throw new RuntimeException("income não encontrado");
        }
        incomeRepository.deleteById(id);
    }
}

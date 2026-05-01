package com.example.demo.dto;

import com.example.demo.enums.ExpenseTipes;

public record ExpenseDTO(

        ExpenseTipes expenseTipes,
        String name,
        Double value,
        Boolean enable,
        Integer userId
) {
}

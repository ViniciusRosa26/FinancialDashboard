package com.example.demo.dto;

import com.example.demo.enums.HeritageTipes;
import com.example.demo.enums.IncomeTipes;

public record IncomeDTO(

        IncomeTipes incomeTipes,
        String name,
        Double value,
        Boolean enable,
        Integer userId
) {
}



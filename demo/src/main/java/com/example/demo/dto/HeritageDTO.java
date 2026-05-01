package com.example.demo.dto;

import com.example.demo.enums.HeritageTipes;

public record HeritageDTO(

        HeritageTipes heritageTipes,
        String name,
        Double price,
        Boolean enable,
        Integer userId
) {
}



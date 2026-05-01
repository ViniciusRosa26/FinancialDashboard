package com.example.demo.dto;

public record UserDTO(
        String name,
        String lastName,
        String email,
        String password,
        Boolean enable
) {}
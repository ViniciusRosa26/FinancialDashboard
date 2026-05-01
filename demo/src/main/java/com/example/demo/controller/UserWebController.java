package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserWebController {

private final UserService userService;

    public UserWebController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserDTO dto) {

        userService.createUser(dto);

        return ResponseEntity.ok("Usuário criado com sucesso");
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


}

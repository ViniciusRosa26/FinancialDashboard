package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;

    public void createUser(UserDTO userDto) {

        UserEntity userEntity = UserEntity.builder()
                .name(userDto.name())
                .lastName(userDto.lastName())
                .email(userDto.email())
                .password(userDto.password())
                .enable(userDto.enable())
                .createTime(LocalDateTime.now())
                .build();

        userRepository.save(userEntity);

    }

    public  UserEntity getUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    //@Transactional
    public void  deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public void editUser(Integer id, UserDTO userDto) {

        UserEntity userEntity = userRepository.findById(id).orElse(null);

        if (userEntity != null) {
            userEntity.setName(userDto.name());
            userEntity.setLastName(userDto.lastName());
            userEntity.setEmail(userDto.email());
            userEntity.setPassword(userDto.password());
            userEntity.setEnable(userDto.enable());

            userRepository.save(userEntity);
        }
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}

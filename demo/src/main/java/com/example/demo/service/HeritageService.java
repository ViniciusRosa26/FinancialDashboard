package com.example.demo.service;


import com.example.demo.dto.HeritageDTO;
import com.example.demo.entity.HeritageEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.HeritageRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor


public class HeritageService {

    private final HeritageRepository heritageRepository;
private final UserRepository userRepository;


    public void createHeritage(HeritageDTO heritageDTO){

        UserEntity user = userRepository.findById(heritageDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        HeritageEntity heritageEntity = HeritageEntity.builder()
                .heritageTipes(heritageDTO.heritageTipes())
                .name(heritageDTO.name())
                .price(heritageDTO.price())
                .enable(heritageDTO.enable())
                .user(user)
                .build();

        heritageRepository.save(heritageEntity);

    }



    public List<HeritageEntity> getAllHeritages() {
        return heritageRepository.findAll();
    }

    public HeritageEntity getHeritageById(Integer id) {
        return heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Heritage não encontrado"));
    }

    public void updateHeritage(Integer id, HeritageDTO heritageDTO) {
        HeritageEntity heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Heritage não encontrado"));

        UserEntity user = userRepository.findById(heritageDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        heritage.setHeritageTipes(heritageDTO.heritageTipes());
        heritage.setName(heritageDTO.name());
        heritage.setPrice(heritageDTO.price());
        heritage.setEnable(heritageDTO.enable());
        heritage.setUser(user);

        heritageRepository.save(heritage);
    }

    public void deleteHeritage(Integer id) {
        if (!heritageRepository.existsById(id)) {
            throw new RuntimeException("Heritage não encontrado");
        }
        heritageRepository.deleteById(id);
    }
}

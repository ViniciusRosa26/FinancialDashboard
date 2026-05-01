package com.example.demo.controller;

import com.example.demo.dto.HeritageDTO;
import com.example.demo.entity.HeritageEntity;
import com.example.demo.service.HeritageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/heritages")
@CrossOrigin(origins = "*")
public class HeritageWebController {

    private final HeritageService heritageService;

    public HeritageWebController(HeritageService heritageService) {
        this.heritageService = heritageService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody HeritageDTO dto) {
        heritageService.createHeritage(dto);
        return ResponseEntity.ok("Heritage criado com sucesso");
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<HeritageEntity> heritages = heritageService.getAllHeritages();
        return ResponseEntity.ok(heritages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        HeritageEntity heritage = heritageService.getHeritageById(id);
        return ResponseEntity.ok(heritage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable Integer id, @RequestBody HeritageDTO dto) {
        heritageService.updateHeritage(id, dto);
        return ResponseEntity.ok("Heritage atualizado com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        heritageService.deleteHeritage(id);
        return ResponseEntity.ok("Heritage deletado com sucesso");
    }
}

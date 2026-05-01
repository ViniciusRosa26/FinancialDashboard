package com.example.demo.controller;

import com.example.demo.dto.OverviewSummaryDTO;
import com.example.demo.service.OverviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/overviews")
@CrossOrigin(origins = "*")
public class OverviewWebController {

    private final OverviewService overviewService;

    public OverviewWebController(OverviewService overviewService) {
        this.overviewService = overviewService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<OverviewSummaryDTO> get(@PathVariable Integer userId) {
        return ResponseEntity.ok(overviewService.getSummaryByUserId(userId));
    }
}

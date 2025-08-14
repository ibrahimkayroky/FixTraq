package com.FixTraq.FixTraq.controller;
import com.FixTraq.FixTraq.dto.PartReplacementDTO;
import com.FixTraq.FixTraq.model.PartReplacement;
import com.FixTraq.FixTraq.service.PartReplacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/replacements")
@RequiredArgsConstructor
public class PartReplacementController {

    private final PartReplacementService replacementService;

    @PostMapping
    public ResponseEntity<PartReplacement> add(@RequestBody PartReplacementDTO dto) {
        return ResponseEntity.ok(replacementService.addReplacement(dto));
    }

    @GetMapping("/maintenance/{recordId}")
    public ResponseEntity<List<PartReplacement>> getByMaintenanceRecord(@PathVariable Long recordId) {
        return ResponseEntity.ok(replacementService.getByMaintenanceRecord(recordId));
    }
}

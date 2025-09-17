package com.FixTraq.FixTraq.controller;

import com.FixTraq.FixTraq.model.SparePart;
import com.FixTraq.FixTraq.service.SparePartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spare-parts")
@RequiredArgsConstructor
public class SparePartController {

    private final SparePartService sparePartService;

    @PostMapping
    public ResponseEntity<SparePart> addPart(@RequestBody SparePart part) {
        return ResponseEntity.ok(sparePartService.addPart(part));
    }

    @GetMapping
    public ResponseEntity<List<SparePart>> getAllParts() {
        return ResponseEntity.ok(sparePartService.getAllParts());
    }

    @PostMapping("/{id}/use/{quantity}")
    public ResponseEntity<Void> usePart(@PathVariable Long id, @PathVariable int quantity) {
        sparePartService.reduceStock(id, quantity);
        return ResponseEntity.ok().build();
    }
}

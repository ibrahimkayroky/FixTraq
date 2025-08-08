package com.FixTraq.FixTraq.controller;

import com.FixTraq.FixTraq.dto.MaintenanceRecordDTO;
import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.service.MaintenanceRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceRecordService;

    @PostMapping
    public ResponseEntity<MaintenanceRecord> add(@RequestBody MaintenanceRecordDTO maintenanceRecordDTO) {
        return ResponseEntity.ok(maintenanceRecordService.addRecord(maintenanceRecordDTO));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<MaintenanceRecord>> getByVehicle(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(maintenanceRecordService.getByVehicle(vehicleId));
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceRecord>> getAll() {
        return ResponseEntity.ok(maintenanceRecordService.getAll());
    }
}

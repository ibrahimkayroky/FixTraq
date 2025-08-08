package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.dto.MaintenanceRecordDTO;
import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.repository.MaintenanceRecordRepository;
import com.FixTraq.FixTraq.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceRecordService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final VehicleRepository vehicleRepository;

    public MaintenanceRecord addRecord(MaintenanceRecordDTO maintenanceRecordDTO)
    {
        Vehicle vehicle = vehicleRepository.findById(maintenanceRecordDTO.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        MaintenanceRecord maintenanceRecord = MaintenanceRecord.builder()
                .vehicle(vehicle)
                .maintenanceType(maintenanceRecordDTO.getMaintenanceType())
                .description(maintenanceRecordDTO.getDescription())
                .maintenanceDate(maintenanceRecordDTO.getMaintenanceDate())
                .mileageAtService(maintenanceRecordDTO.getMileageAtService())
                .cost(maintenanceRecordDTO.getCost())
                .nextScheduledDate(maintenanceRecordDTO.getNextScheduledDate())
                .build();

        return maintenanceRecordRepository.save(maintenanceRecord);
    }

    public List<MaintenanceRecord> getByVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("vehicle not found"));

        return maintenanceRecordRepository.findByVehicle(vehicle);
    }

    public List<MaintenanceRecord> getAll() {
        return maintenanceRecordRepository.findAll();
    }

}

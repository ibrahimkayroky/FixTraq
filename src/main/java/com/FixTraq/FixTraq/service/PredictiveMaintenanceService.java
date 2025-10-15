package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.repository.MaintenanceRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PredictiveMaintenanceService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public double predictNextMaintenance(Vehicle vehicle) {
        double avgDistanceBetweenMaintenances = maintenanceRecordRepository.findAll().stream()
                .filter(r -> r.getVehicle().equals(vehicle))
                .mapToDouble(r -> r.getVehicle().getMileage())
                .average().orElse(5000.0);

        return vehicle.getMileage() + avgDistanceBetweenMaintenances;
    }
}

package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsPlateNumber(vehicle.getPlateNumber())){
            throw new RuntimeException("Vehicle already exists!");
        }
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicle() {
        return vehicleRepository.findAll();
    }
}

package com.FixTraq.FixTraq.repository;

import com.FixTraq.FixTraq.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsPlateNumber(String plateNumber);
}

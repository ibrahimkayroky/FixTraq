package com.FixTraq.FixTraq.repository;

import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
    List<MaintenanceRecord> findByVehicle(Vehicle vehicle);
}

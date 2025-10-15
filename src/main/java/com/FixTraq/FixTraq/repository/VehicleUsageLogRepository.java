package com.FixTraq.FixTraq.repository;

import com.FixTraq.FixTraq.model.VehicleUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleUsageLogRepository extends JpaRepository<VehicleUsageLog, Long> {
}

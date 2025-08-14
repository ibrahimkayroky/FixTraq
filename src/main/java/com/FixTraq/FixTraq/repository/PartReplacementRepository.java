package com.FixTraq.FixTraq.repository;

import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.model.PartReplacement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartReplacementRepository extends JpaRepository<PartReplacement, Long> {
    List<PartReplacement> findByMaintenanceRecord(MaintenanceRecord maintenanceRecord);
}

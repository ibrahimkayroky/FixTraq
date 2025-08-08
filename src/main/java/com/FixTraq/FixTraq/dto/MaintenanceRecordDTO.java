package com.FixTraq.FixTraq.dto;

import com.FixTraq.FixTraq.enumeration.MaintenanceType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MaintenanceRecordDTO {
    private Long vehicleId;
    private MaintenanceType maintenanceType;
    private String description;
    private LocalDate maintenanceDate;
    private int mileageAtService;
    private double cost;
    private LocalDate nextScheduledDate;
}

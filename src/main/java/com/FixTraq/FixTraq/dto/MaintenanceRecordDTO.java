package com.FixTraq.FixTraq.dto;

import com.FixTraq.FixTraq.enumeration.MaintenanceType;

import java.time.LocalDate;

public record MaintenanceRecordDTO( 
    Long vehicleId, 
    MaintenanceType maintenanceType, 
    String description, 
    LocalDate maintenanceDate, 
    int mileageAtService, 
    double cost, 
    LocalDate nextScheduledDate
){} 
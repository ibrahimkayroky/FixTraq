package com.FixTraq.FixTraq.dto;

import com.FixTraq.FixTraq.enumeration.VehicleStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateVehicleRequest {

    private String model;
    private Integer mileage;
    private VehicleStatus status;
    private LocalDate lastMaintenanceDate;
}

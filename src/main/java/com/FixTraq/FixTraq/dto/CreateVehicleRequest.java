package com.FixTraq.FixTraq.dto;

import com.FixTraq.FixTraq.enumeration.VehicleStatus;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateVehicleRequest {

    @NotBlank
    private String plateNumber;

    @NotBlank
    private String type;

    @NotBlank
    private String model;

    @Min(1960)
    private Integer year;

    @Min(0)
    private Integer mileage;

    private LocalDate lastMaintenanceDate;
}

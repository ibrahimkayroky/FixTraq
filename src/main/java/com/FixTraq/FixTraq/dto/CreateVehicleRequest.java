package com.FixTraq.FixTraq.dto;

import com.FixTraq.FixTraq.enumeration.VehicleStatus;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateVehicleRequest {

    private String plateNumber;
    private String type;
    private String model;
    private int year;
    private int mileage;
    private VehicleStatus status;
    private LocalDate lastMaintenanceDate;
}

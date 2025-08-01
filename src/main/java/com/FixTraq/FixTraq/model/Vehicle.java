package com.FixTraq.FixTraq.model;

import com.FixTraq.FixTraq.enumeration.VehicleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plateNumber;
    private String type;
    private String model;
    private int year;
    private int mileage;

    @Enumerated(EnumType.STRING)
    private VehicleStatus status;

    private LocalDate lastMaintenanceDate;
}


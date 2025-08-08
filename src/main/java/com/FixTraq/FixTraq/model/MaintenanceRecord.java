package com.FixTraq.FixTraq.model;

import com.FixTraq.FixTraq.enumeration.MaintenanceType;
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
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Enumerated(EnumType.STRING)
    private MaintenanceType maintenanceType;

    private String description;
    private LocalDate maintenanceDate;
    private int mileageAtService;
    private double cost;

    private LocalDate nextScheduledDate;
}

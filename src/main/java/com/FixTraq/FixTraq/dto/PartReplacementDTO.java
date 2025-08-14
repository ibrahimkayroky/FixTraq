package com.FixTraq.FixTraq.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PartReplacementDTO {

    private Long maintenanceRecordId;
    private String partName;
    private LocalDate replacementDate;
    private double cost;
}

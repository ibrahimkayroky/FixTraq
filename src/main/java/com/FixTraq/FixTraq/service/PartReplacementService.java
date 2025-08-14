package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.dto.PartReplacementDTO;
import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.model.PartReplacement;
import com.FixTraq.FixTraq.repository.MaintenanceRecordRepository;
import com.FixTraq.FixTraq.repository.PartReplacementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartReplacementService {

    private final PartReplacementRepository partReplacementRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public PartReplacement addReplacement(PartReplacementDTO partReplacementDTO) {
        MaintenanceRecord maintenanceRecord = maintenanceRecordRepository.findById(partReplacementDTO.getMaintenanceRecordId())
                .orElseThrow(() -> new RuntimeException("Maintenance record not found"));

        PartReplacement replacement = PartReplacement.builder()
                .partName(partReplacementDTO.getPartName())
                .replacementDate(partReplacementDTO.getReplacementDate())
                .cost(partReplacementDTO.getCost())
                .maintenanceRecord(maintenanceRecord)
                .build();

            return partReplacementRepository.save(replacement);
        }
        public List<PartReplacement> getByMaintenanceRecord(Long recordId) {
            MaintenanceRecord record = maintenanceRecordRepository.findById(recordId)
                    .orElseThrow(() -> new RuntimeException("Maintenance record not found"));

            return partReplacementRepository.findByMaintenanceRecord(record);
        }
}

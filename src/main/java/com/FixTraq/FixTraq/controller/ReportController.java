package com.FixTraq.FixTraq.controller;

import com.FixTraq.FixTraq.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    public ResponseEntity<byte[]> getMaintenanceReportPdf() {
        ByteArrayInputStream byteArrayInputStream = reportService.generateMaintenanceReport();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=maintenance-report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(byteArrayInputStream.readAllBytes());
    }
}

package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.MaintenanceRecord;
import com.FixTraq.FixTraq.repository.MaintenanceRecordRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.itextpdf.layout.Document;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public ByteArrayInputStream generateMaintenanceReport() {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("تقرير الصيانه")).setBold().setFontSize(18);

        float[] columnWidths = {100F, 200F, 150F, 100F};
        Table table = new Table(columnWidths);

        table.addCell("رقم المركبة");
        table.addCell("الوصف");
        table.addCell("التاريخ");
        table.addCell("التكلفة");

        List<MaintenanceRecord> records = maintenanceRecordRepository.findAll();

        for (MaintenanceRecord record : records) {
            table.addCell(record.getVehicle().getPlateNumber());
            table.addCell(record.getDescription());
            table.addCell(record.getMaintenanceDate().toString());
            table.addCell(String.valueOf(record.getCost()));
        }

        document.add(table);
        document.close();

        return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());



    }

}

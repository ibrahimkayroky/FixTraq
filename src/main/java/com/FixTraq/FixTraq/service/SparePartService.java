package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.SparePart;
import com.FixTraq.FixTraq.repository.SparePartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SparePartService {

    private final SparePartRepository sparePartRepository;

    public SparePart addPart(SparePart sparePart)
    {
        return sparePartRepository.save(sparePart);
    }

    public List<SparePart> getAllParts() {
        return sparePartRepository.findAll();
    }

    public void reduceStock(Long id, int usedQuantity) {
        sparePartRepository.findById(id).ifPresent(sparePart -> {
            if (sparePart.getQuantity() >= usedQuantity) {
                sparePart.setQuantity(sparePart.getQuantity() - usedQuantity);
                sparePartRepository.save(sparePart);
            } else {
                throw new RuntimeException("Stock not sufficient");
            }
        });
    }

}

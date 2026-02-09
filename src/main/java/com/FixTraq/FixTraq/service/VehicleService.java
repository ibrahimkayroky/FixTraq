package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public Vehicle addVehicle(CreateVehicleRequest request, User currentUser) {

        if (vehicleRepository.existsByPlateNumberAndUser(
            request.getPlateNumber(), currentUser)) {
        throw new VehicleAlreadyExistsException(request.getPlateNumber());
    }    

        Vehicle vehicle = Vehicle.builder()
                .plateNumber(request.getPlateNumber())
                .type(request.getType())
                .model(request.getModel())
                .year(request.getYear())
                .mileage(request.getMileage())
                .lastMaintenanceDate(request.getLastMaintenanceDate())
                .status(VehicleStatus.ACTIVE)
                .user(currentUser)
                .build();

        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getMyVehicles(User currentUser) {
        return vehicleRepository.findByUser(currentUser);
    }

    public void deleteVehicle(Long id, User user) {
        Vehicle vehicle = vehicleRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new VehicleNotFoundException(id));
    
        vehicle.setDeleted(true);
        vehicleRepository.save(vehicle);
    }

    public Page<Vehicle> getMyVehicles(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return vehicleRepository.findByUserAndDeletedFalse(user, pageable);
    }
    
    
}

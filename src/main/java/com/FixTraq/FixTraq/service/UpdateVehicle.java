package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.dto.UpdateVehicleRequest;
import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.model.User;
import com.FixTraq.FixTraq.repository.VehicleRepository;
import com.FixTraq.FixTraq.exception.VehicleNotFoundException;

@Service
@RequiredArgsConstructor
public Vehicle updateVehicle(
    Long vehicleId,
    UpdateVehicleRequest request,
    User currentUser
) {
Vehicle vehicle = vehicleRepository
        .findByIdAndUser(vehicleId, currentUser)
        .orElseThrow(() -> new VehicleNotFoundException(vehicleId));

if (request.getModel() != null)
    vehicle.setModel(request.getModel());

if (request.getMileage() != null)
    vehicle.setMileage(request.getMileage());

if (request.getStatus() != null)
    vehicle.setStatus(request.getStatus());

if (request.getLastMaintenanceDate() != null)
    vehicle.setLastMaintenanceDate(request.getLastMaintenanceDate());

return vehicleRepository.save(vehicle);
}

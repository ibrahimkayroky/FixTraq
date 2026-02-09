package com.FixTraq.FixTraq.repository;

import com.FixTraq.FixTraq.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByIdAndUser(Long id, User user);
    boolean existsByPlateNumberAndUser(String plateNumber, User user);
    List<Vehicle> findByUser(User user);
    
    @Query("SELECT v FROM Vehicle v WHERE v.user = :user AND v.deleted = false")
    List<Vehicle> findActiveByUser(User user);

    Page<Vehicle> findByUserAndDeletedFalse(User user, Pageable pageable);


}

package com.FixTraq.FixTraq.exception;

public class VehicleAlreadyExistsException extends RuntimeException {
    public VehicleAlreadyExistsException(String plateNumber) {
        super("Vehicle with plate number " + plateNumber + " already exists");
    }
}

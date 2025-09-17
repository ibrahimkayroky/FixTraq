package com.FixTraq.FixTraq.service;

import com.FixTraq.FixTraq.model.Notification;
import com.FixTraq.FixTraq.model.Vehicle;
import com.FixTraq.FixTraq.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private NotificationRepository notificationRepository;

    public Notification createNotification(String message, Vehicle vehicle) {
        Notification notification = Notification.builder()
                .message(message)
                .vehicle(vehicle)
                .createdAt(LocalDateTime.now())
                .read(false)
                .build();
        return notificationRepository.save(notification);
    }
    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByReadFalse();
    }

    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

}

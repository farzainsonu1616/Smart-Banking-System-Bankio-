package com.bankingsystem.service;

import com.bankingsystem.dto.NotificationDTO;
import java.util.List;

public interface NotificationService {
    void sendNotification(Long userId, String title, String type, String message);
    List<NotificationDTO> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
}

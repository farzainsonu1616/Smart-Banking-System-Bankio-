package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.NotificationDTO;
import com.bankingsystem.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Notifications fetched successfully", notificationService.getUserNotifications(userId)));
    }

    @PutMapping("/{notificationId}/read")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", null));
    }
}

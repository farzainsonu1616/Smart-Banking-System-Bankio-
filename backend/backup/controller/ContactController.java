package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.ContactMessage;
import com.bankingsystem.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@SuppressWarnings("null")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> submitContact(@Valid @RequestBody ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .isRead(false)
                .build();
        contactMessageRepository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Message sent successfully!"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getMessages() {
        List<ContactMessage> messages = contactMessageRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.success("Messages fetched", messages));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> markAsRead(@PathVariable Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        msg.setIsRead(true);
        contactMessageRepository.save(msg);
        return ResponseEntity.ok(ApiResponse.success("Marked as read"));
    }
}

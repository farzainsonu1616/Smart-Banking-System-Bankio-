package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.SupportTicketDTO;
import com.bankingsystem.service.SupportTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SupportTicketController {

    private final SupportTicketService ticketService;

    @PostMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<SupportTicketDTO>> createTicket(
            @PathVariable Long userId,
            @RequestBody SupportTicketDTO ticketDTO) {
        return ResponseEntity.ok(ApiResponse.success("Ticket created successfully", ticketService.createTicket(userId, ticketDTO)));
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<SupportTicketDTO>>> getTicketsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Tickets fetched successfully", ticketService.getTicketsByUser(userId)));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<SupportTicketDTO>>> getAllTickets() {
        return ResponseEntity.ok(ApiResponse.success("All tickets fetched successfully", ticketService.getAllTickets()));
    }

    @PutMapping("/{ticketId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SupportTicketDTO>> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Ticket status updated successfully", ticketService.updateTicketStatus(ticketId, status)));
    }
}

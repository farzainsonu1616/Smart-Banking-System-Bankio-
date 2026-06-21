package com.bankingsystem.service.impl;

import com.bankingsystem.dto.SupportTicketDTO;
import com.bankingsystem.entity.SupportTicket;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.SupportTicketRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.SupportTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class SupportTicketServiceImpl implements SupportTicketService {

    private final SupportTicketRepository ticketRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public SupportTicketDTO createTicket(Long userId, SupportTicketDTO ticketDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        SupportTicket ticket = SupportTicket.builder()
                .ticketReference("TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(user)
                .subject(ticketDTO.getSubject())
                .description(ticketDTO.getDescription())
                .priority(ticketDTO.getPriority() != null ? ticketDTO.getPriority() : "LOW")
                .status("OPEN")
                .build();

        return mapToDTO(ticketRepository.save(ticket));
    }

    @Override
    public List<SupportTicketDTO> getTicketsByUser(Long userId) {
        return ticketRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SupportTicketDTO> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupportTicketDTO updateTicketStatus(Long ticketId, String status) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        
        ticket.setStatus(status);
        return mapToDTO(ticketRepository.save(ticket));
    }

    private SupportTicketDTO mapToDTO(SupportTicket ticket) {
        return SupportTicketDTO.builder()
                .id(ticket.getId())
                .ticketNumber(ticket.getTicketReference())
                .userId(ticket.getUser() != null ? ticket.getUser().getId() : null)
                .subject(ticket.getSubject())
                .description(ticket.getDescription())
                .priority(ticket.getPriority())
                .status(ticket.getStatus())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}

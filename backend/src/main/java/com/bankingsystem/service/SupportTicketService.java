package com.bankingsystem.service;

import com.bankingsystem.dto.SupportTicketDTO;
import java.util.List;

public interface SupportTicketService {
    SupportTicketDTO createTicket(Long userId, SupportTicketDTO ticketDTO);
    List<SupportTicketDTO> getTicketsByUser(Long userId);
    List<SupportTicketDTO> getAllTickets();
    SupportTicketDTO updateTicketStatus(Long ticketId, String status);
}

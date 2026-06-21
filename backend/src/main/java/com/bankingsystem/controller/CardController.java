package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.CardDTO;
import com.bankingsystem.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CardController {

    private final CardService cardService;

    @PostMapping("/issue")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<CardDTO>> issueCard(@RequestBody Map<String, String> request) {
        Long accountId = Long.valueOf(request.get("accountId"));
        String cardType = request.get("cardType");

        CardDTO issuedCard = cardService.issueCard(accountId, cardType);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Card issued successfully", issuedCard));
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getCardsByAccount(@PathVariable Long accountId) {
        List<CardDTO> cards = cardService.getCardsByAccountId(accountId);
        return ResponseEntity.ok(ApiResponse.success("Cards fetched successfully", cards));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getUserCards() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        List<CardDTO> cards = cardService.getCardsByUser(email);
        return ResponseEntity.ok(ApiResponse.success("Cards fetched successfully", cards));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<CardDTO>> getCardById(@PathVariable Long id) {
        CardDTO card = cardService.getCardById(id);
        return ResponseEntity.ok(ApiResponse.success("Card fetched successfully", card));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<CardDTO>> updateCardStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        CardDTO updatedCard = cardService.updateCardStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Card status updated successfully", updatedCard));
    }
}

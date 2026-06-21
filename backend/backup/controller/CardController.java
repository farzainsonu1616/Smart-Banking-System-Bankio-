package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.service.CardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<CardResponse>> requestCard(Authentication auth, @Valid @RequestBody CardRequest request) {
        CardResponse response = cardService.requestCard(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Card requested successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CardResponse>>> getCards(Authentication auth) {
        List<CardResponse> cards = cardService.getCards(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Cards fetched", cards));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CardResponse>> getCardById(Authentication auth, @PathVariable Long id) {
        CardResponse card = cardService.getCardById(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Card fetched", card));
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<ApiResponse<CardResponse>> blockCard(Authentication auth, @PathVariable Long id) {
        CardResponse card = cardService.blockCard(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Card blocked successfully", card));
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<ApiResponse<CardResponse>> activateCard(Authentication auth, @PathVariable Long id) {
        CardResponse card = cardService.activateCard(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Card activated successfully", card));
    }
}

package com.bankingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardDTO {
    private Long id;
    private String cardNumber;
    private String cardType; // DEBIT, CREDIT
    private LocalDate expirationDate;
    private String cvv;
    private BigDecimal creditLimit; // Only for CREDIT
    private String status; // ACTIVE, BLOCKED, EXPIRED
    private Long accountId;
}

package com.bankingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDTO {
    private Long id;
    private String transactionId;
    private String referenceNumber;
    private Long accountId;
    private BigDecimal amount;
    private String type; // DEPOSIT, WITHDRAWAL, TRANSFER
    private String status; // SUCCESS, PENDING, FAILED
    private String description;
    private Long targetAccountId;
    private LocalDateTime timestamp;
}

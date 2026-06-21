package com.bankingsystem.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TransactionResponse {
    private Long id;
    private String fromAccountNumber;
    private String toAccountNumber;
    private String type;
    private BigDecimal amount;
    private BigDecimal balanceAfter;
    private String description;
    private String referenceNumber;
    private String status;
    private LocalDateTime transactionDate;
}

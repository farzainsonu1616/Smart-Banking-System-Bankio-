package com.bankingsystem.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class CardResponse {
    private Long id;
    private String cardNumber;
    private String cardType;
    private String cardCategory;
    private String cardHolderName;
    private LocalDate expiryDate;
    private BigDecimal creditLimit;
    private BigDecimal availableBalance;
    private String status;
    private String accountNumber;
    private LocalDateTime createdAt;
}

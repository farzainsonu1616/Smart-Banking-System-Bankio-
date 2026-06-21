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
public class LoanDTO {
    private Long id;
    private String loanType;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer tenureMonths;
    private String status; // PENDING, APPROVED, REJECTED, ACTIVE, CLOSED
    private Long userId;
    private LocalDateTime appliedAt;
    private LocalDateTime approvedAt;
}

package com.bankingsystem.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoanResponse {
    private Long id;
    private String loanType;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer tenureMonths;
    private BigDecimal monthlyEmi;
    private BigDecimal totalPayable;
    private BigDecimal amountPaid;
    private String status;
    private String purpose;
    private String accountNumber;
    private LocalDateTime appliedDate;
    private LocalDateTime approvedDate;
}

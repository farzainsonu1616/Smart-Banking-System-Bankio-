package com.bankingsystem.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoanRequest {

    @NotBlank(message = "Loan type is required")
    private String loanType;

    private Long accountId;

    @NotNull(message = "Loan amount is required")
    @DecimalMin(value = "10000", message = "Minimum loan amount is 10,000")
    private BigDecimal amount;

    @NotNull(message = "Interest rate is required")
    private BigDecimal interestRate;

    @NotNull(message = "Tenure is required")
    @Min(value = 6, message = "Minimum tenure is 6 months")
    @Max(value = 360, message = "Maximum tenure is 360 months")
    private Integer tenureMonths;

    private String purpose;
}

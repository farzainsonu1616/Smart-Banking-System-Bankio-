package com.bankingsystem.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TransactionRequest {

    private Long fromAccountId;
    private Long toAccountId;
    private String toAccountNumber;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Minimum transaction amount is 1.00")
    private BigDecimal amount;

    private String description;
    private String type;
}

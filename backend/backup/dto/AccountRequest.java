package com.bankingsystem.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AccountRequest {

    @NotBlank(message = "Account type is required")
    private String accountType;

    @Builder.Default private String currency = "INR";
}

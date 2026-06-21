package com.bankingsystem.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class CardRequest {

    @NotBlank(message = "Card type is required")
    private String cardType;

    private String cardCategory;
    private Long accountId;
}

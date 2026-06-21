package com.bankingsystem.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ContactRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String subject;

    @NotBlank(message = "Message is required")
    @Size(min = 10, message = "Message must be at least 10 characters")
    private String message;
}

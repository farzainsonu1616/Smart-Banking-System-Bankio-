package com.bankingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BeneficiaryDTO {
    private Long id;
    private String name;
    private String accountNumber;
    private String ifscCode;
    private String bankName;
    private String status; // PENDING, APPROVED, REJECTED
    private Long userId;
    private LocalDateTime createdAt;
}

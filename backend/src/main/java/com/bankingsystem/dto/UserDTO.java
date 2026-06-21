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
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String username;
    private String roles;
    private boolean isEmailVerified;
    private boolean isPhoneVerified;
    private boolean isActive;
    private boolean isLocked;
    private LocalDateTime createdAt;
}

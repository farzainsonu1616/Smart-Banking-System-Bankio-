package com.bankingsystem.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    @Builder.Default private String tokenType = "Bearer";
    private UserResponse user;
}

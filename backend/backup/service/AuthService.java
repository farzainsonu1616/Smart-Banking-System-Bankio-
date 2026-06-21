package com.bankingsystem.service;

import com.bankingsystem.dto.*;

public interface AuthService {
    ApiResponse<?> register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    ApiResponse<?> verifyOtp(OtpRequest request);
    ApiResponse<?> resendOtp(String email);
    ApiResponse<?> forgotPassword(String email);
    ApiResponse<?> resetPassword(PasswordResetRequest request);
    UserResponse getCurrentUser(String email);
    UserResponse updateProfile(String email, UserResponse request);
}

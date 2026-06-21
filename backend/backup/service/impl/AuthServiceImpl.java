package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.OTP;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.*;
import com.bankingsystem.repository.OtpRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.security.CustomUserDetailsService;
import com.bankingsystem.security.JwtUtil;
import com.bankingsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional
@SuppressWarnings("null")
public class AuthServiceImpl implements AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private OtpRepository otpRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private CustomUserDetailsService userDetailsService;
    @Autowired private JwtUtil jwtUtil;

    @Override
    public ApiResponse<?> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(User.Role.USER)
                .isVerified(true)
                .isActive(true)
                .build();

        userRepository.save(user);

        return ApiResponse.success("Registration successful. Please login.", null);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getIsActive()) {
            throw new UnauthorizedException("Account is deactivated. Contact support.");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        String accessToken = jwtUtil.generateAccessToken(userDetails, user.getId(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        UserResponse userResponse = mapToUserResponse(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(userResponse)
                .build();
    }

    @Override
    public ApiResponse<?> verifyOtp(OtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        OTP otp = otpRepository.findTopByUserIdAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(
                        user.getId(), OTP.OtpPurpose.REGISTRATION)
                .orElseThrow(() -> new BadRequestException("No valid OTP found. Please request a new one."));

        if (otp.isExpired()) {
            throw new BadRequestException("OTP has expired. Please request a new one.");
        }

        if (!otp.getOtpCode().equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP. Please try again.");
        }

        otp.setIsUsed(true);
        otpRepository.save(otp);

        user.setIsVerified(true);
        userRepository.save(user);

        return ApiResponse.success("Account verified successfully!");
    }

    @Override
    public ApiResponse<?> resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        String otpCode = generateOtp();
        OTP otp = OTP.builder()
                .user(user)
                .otpCode(otpCode)
                .purpose(OTP.OtpPurpose.REGISTRATION)
                .isUsed(false)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        otpRepository.save(otp);

        System.out.println("========================================");
        System.out.println("Resent OTP for " + email + ": " + otpCode);
        System.out.println("========================================");

        return ApiResponse.success("OTP resent successfully.");
    }

    @Override
    public ApiResponse<?> forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        String otpCode = generateOtp();
        OTP otp = OTP.builder()
                .user(user)
                .otpCode(otpCode)
                .purpose(OTP.OtpPurpose.PASSWORD_RESET)
                .isUsed(false)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        otpRepository.save(otp);

        System.out.println("========================================");
        System.out.println("Password Reset OTP for " + email + ": " + otpCode);
        System.out.println("========================================");

        return ApiResponse.success("Password reset OTP sent to your email.");
    }

    @Override
    public ApiResponse<?> resetPassword(PasswordResetRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        OTP otp = otpRepository.findTopByUserIdAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(
                        user.getId(), OTP.OtpPurpose.PASSWORD_RESET)
                .orElseThrow(() -> new BadRequestException("No valid OTP found."));

        if (otp.isExpired()) {
            throw new BadRequestException("OTP has expired.");
        }

        if (!otp.getOtpCode().equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP.");
        }

        otp.setIsUsed(true);
        otpRepository.save(otp);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ApiResponse.success("Password reset successfully!");
    }

    @Override
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    @Override
    public UserResponse updateProfile(String email, UserResponse request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        if (request.getCity() != null) user.setCity(request.getCity());
        if (request.getState() != null) user.setState(request.getState());
        if (request.getZipCode() != null) user.setZipCode(request.getZipCode());
        if (request.getCountry() != null) user.setCountry(request.getCountry());

        userRepository.save(user);
        return mapToUserResponse(user);
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .city(user.getCity())
                .state(user.getState())
                .zipCode(user.getZipCode())
                .country(user.getCountry())
                .role(user.getRole().name())
                .isVerified(user.getIsVerified())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.OtpVerification;
import com.bankingsystem.entity.Role;
import com.bankingsystem.entity.User;
import com.bankingsystem.repository.OtpVerificationRepository;
import com.bankingsystem.repository.RoleRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpVerificationRepository otpVerificationRepository;

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email is already registered"));
        }

        Role customerRole = roleRepository.findByName("CUSTOMER").orElseGet(() -> roleRepository.save(new Role(null, "CUSTOMER")));

        User user = User.builder()
                .fullName(request.getFirstName() + " " + request.getLastName())
                .email(request.getEmail())
                .mobile(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .isEnabled(false) // Needs OTP verification
                .roles(Set.of(customerRole))
                .build();

        userRepository.save(java.util.Objects.requireNonNull(user));

        String otp = generateOtp();
        OtpVerification otpVerification = OtpVerification.builder()
                .email(request.getEmail())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .isUsed(false)
                .purpose("REGISTRATION")
                .build();

        otpVerificationRepository.save(java.util.Objects.requireNonNull(otpVerification));

        // Email OTP Simulation
        System.out.println("==========================================");
        System.out.println("SIMULATED EMAIL TO: " + request.getEmail());
        System.out.println("SUBJECT: Your Registration OTP");
        System.out.println("BODY: Your OTP is " + otp + ". It is valid for 10 minutes.");
        System.out.println("==========================================");

        return ResponseEntity.ok(ApiResponse.success("Registration successful. Please verify OTP.", null));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestBody OtpVerificationRequest request) {
        OtpVerification otpVerification = otpVerificationRepository
                .findTopByEmailAndOtpAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(request.getEmail(), request.getOtp(), "REGISTRATION")
                .orElse(null);

        if (otpVerification == null || otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid or expired OTP"));
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found"));
        }

        user.setEnabled(true);
        userRepository.save(user);

        otpVerification.setUsed(true);
        otpVerificationRepository.save(otpVerification);

        return ResponseEntity.ok(ApiResponse.success("Account verified successfully", null));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<String>> resendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found"));
        }
        
        if (user.isEnabled()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Account is already verified"));
        }

        String otp = generateOtp();
        OtpVerification otpVerification = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .isUsed(false)
                .purpose("REGISTRATION")
                .build();

        otpVerificationRepository.save(java.util.Objects.requireNonNull(otpVerification));

        // Email OTP Simulation
        System.out.println("==========================================");
        System.out.println("SIMULATED EMAIL TO: " + email);
        System.out.println("SUBJECT: Your New Registration OTP");
        System.out.println("BODY: Your new OTP is " + otp + ". It is valid for 10 minutes.");
        System.out.println("==========================================");

        return ResponseEntity.ok(ApiResponse.success("A new OTP has been sent", null));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            // Don't reveal if user exists or not for security reasons, just pretend it sent
            return ResponseEntity.ok(ApiResponse.success("If that email is registered, a password reset OTP has been sent.", null));
        }

        String otp = generateOtp();
        OtpVerification otpVerification = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(15))
                .isUsed(false)
                .purpose("PASSWORD_RESET")
                .build();

        otpVerificationRepository.save(java.util.Objects.requireNonNull(otpVerification));

        // Email OTP Simulation
        System.out.println("==========================================");
        System.out.println("SIMULATED EMAIL TO: " + email);
        System.out.println("SUBJECT: Password Reset OTP");
        System.out.println("BODY: Your password reset OTP is " + otp + ". It is valid for 15 minutes.");
        System.out.println("==========================================");

        return ResponseEntity.ok(ApiResponse.success("If that email is registered, a password reset OTP has been sent.", null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody ResetPasswordRequest request) {
        OtpVerification otpVerification = otpVerificationRepository
                .findTopByEmailAndOtpAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(request.getEmail(), request.getOtp(), "PASSWORD_RESET")
                .orElse(null);

        if (otpVerification == null || otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid or expired OTP"));
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found"));
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpVerification.setUsed(true);
        otpVerificationRepository.save(otpVerification);

        return ResponseEntity.ok(ApiResponse.success("Password reset successfully", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@RequestBody AuthRequest loginRequest) {
        User dbUserCheck = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (dbUserCheck != null && !dbUserCheck.isEnabled()) {
            return ResponseEntity.status(403).body(ApiResponse.error("Account not verified. Please verify your email first."));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        org.springframework.security.core.userdetails.User userDetails = 
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

        User dbUser = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        
        String jwt = jwtUtil.generateAccessToken(userDetails, dbUser != null ? dbUser.getId() : 1L, userDetails.getAuthorities().iterator().next().getAuthority());
        String refreshJwt = jwtUtil.generateRefreshToken(userDetails);

        UserDTO userDTO = null;
        if (dbUser != null) {
            String[] nameParts = dbUser.getFullName() != null ? dbUser.getFullName().split(" ", 2) : new String[]{"", ""};
            userDTO = UserDTO.builder()
                    .id(dbUser.getId())
                    .firstName(nameParts[0])
                    .lastName(nameParts.length > 1 ? nameParts[1] : "")
                    .email(dbUser.getEmail())
                    .phone(dbUser.getMobile())
                    .roles(dbUser.getRoles().stream().map(r -> "ROLE_" + r.getName()).reduce((a, b) -> a + "," + b).orElse(""))
                    .build();
        }

        AuthResponse response = AuthResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshJwt)
                .user(userDTO)
                .type("Bearer")
                .build();

        return ResponseEntity.ok(ApiResponse.success("User logged in successfully", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        
        String email = authentication.getName();
        User dbUser = userRepository.findByEmail(email).orElse(null);
        if (dbUser == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));
        }
        
        String[] nameParts = dbUser.getFullName() != null ? dbUser.getFullName().split(" ", 2) : new String[]{"", ""};
        UserDTO userDTO = UserDTO.builder()
                .id(dbUser.getId())
                .firstName(nameParts[0])
                .lastName(nameParts.length > 1 ? nameParts[1] : "")
                .email(dbUser.getEmail())
                .phone(dbUser.getMobile())
                .roles(dbUser.getRoles().stream().map(r -> "ROLE_" + r.getName()).reduce((a, b) -> a + "," + b).orElse(""))
                .isActive(dbUser.isEnabled())
                .build();
                
        return ResponseEntity.ok(ApiResponse.success("User profile fetched", userDTO));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody Map<String, String> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        
        String email = authentication.getName();
        User dbUser = userRepository.findByEmail(email).orElse(null);
        if (dbUser == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));
        }
        
        if (request.containsKey("firstName") || request.containsKey("lastName")) {
            String firstName = request.getOrDefault("firstName", "");
            String lastName = request.getOrDefault("lastName", "");
            dbUser.setFullName((firstName + " " + lastName).trim());
        }
        if (request.containsKey("phone")) {
            dbUser.setMobile(request.get("phone"));
        }
        if (request.containsKey("address")) {
            dbUser.setAddress(request.get("address"));
        }
        
        userRepository.save(dbUser);
        
        String[] nameParts = dbUser.getFullName() != null ? dbUser.getFullName().split(" ", 2) : new String[]{"", ""};
        UserDTO userDTO = UserDTO.builder()
                .id(dbUser.getId())
                .firstName(nameParts[0])
                .lastName(nameParts.length > 1 ? nameParts[1] : "")
                .email(dbUser.getEmail())
                .phone(dbUser.getMobile())
                .roles(dbUser.getRoles().stream().map(r -> "ROLE_" + r.getName()).reduce((a, b) -> a + "," + b).orElse(""))
                .isActive(dbUser.isEnabled())
                .build();
                
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", userDTO));
    }
}

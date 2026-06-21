package com.bankingsystem.repository;

import com.bankingsystem.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findByEmailAndOtp(String email, String otp);
    Optional<OtpVerification> findByMobileAndOtp(String mobile, String otp);
    Optional<OtpVerification> findTopByEmailAndOtpAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(String email, String otp, String purpose);
}

package com.bankingsystem.repository;

import com.bankingsystem.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findTopByUserIdAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(Long userId, OTP.OtpPurpose purpose);
    Optional<OTP> findTopByUserEmailAndPurposeAndIsUsedFalseOrderByCreatedAtDesc(String email, OTP.OtpPurpose purpose);
}

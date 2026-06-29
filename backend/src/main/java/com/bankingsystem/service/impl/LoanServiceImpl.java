package com.bankingsystem.service.impl;

import com.bankingsystem.dto.LoanDTO;
import com.bankingsystem.entity.Loan;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.LoanRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;

    @Override
    public LoanDTO applyForLoan(Long userId, LoanDTO loanDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Calculate EMI: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
        BigDecimal P = loanDTO.getAmount();
        BigDecimal annualRate = loanDTO.getInterestRate() != null ? loanDTO.getInterestRate() : new BigDecimal("10.5");
        int N = loanDTO.getTenureMonths() != null ? loanDTO.getTenureMonths() : 12;

        BigDecimal R = annualRate.divide(BigDecimal.valueOf(12 * 100), 10, RoundingMode.HALF_UP);
        BigDecimal emi;

        if (R.compareTo(BigDecimal.ZERO) > 0) {
            // (1+R)^N
            BigDecimal onePlusR = BigDecimal.ONE.add(R);
            BigDecimal onePlusRpowN = onePlusR.pow(N, new MathContext(15));
            // EMI = P * R * (1+R)^N / ((1+R)^N - 1)
            BigDecimal numerator = P.multiply(R).multiply(onePlusRpowN);
            BigDecimal denominator = onePlusRpowN.subtract(BigDecimal.ONE);
            emi = numerator.divide(denominator, 2, RoundingMode.HALF_UP);
        } else {
            emi = P.divide(BigDecimal.valueOf(N), 2, RoundingMode.HALF_UP);
        }

        Loan loan = Loan.builder()
                .loanReference("LN" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 6))
                .loanType(loanDTO.getLoanType())
                .amount(P)
                .interestRate(annualRate)
                .tenureMonths(N)
                .emi(emi)
                .status("PENDING")
                .user(user)
                .appliedAt(LocalDateTime.now())
                .build();

        return mapToDTO(loanRepository.save(loan));
    }

    @Override
    public List<LoanDTO> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LoanDTO getLoanById(Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        return mapToDTO(loan);
    }

    @Override
    public LoanDTO updateLoanStatus(Long id, String status) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        
        loan.setStatus(status);
        if ("APPROVED".equalsIgnoreCase(status) || "ACTIVE".equalsIgnoreCase(status)) {
            loan.setApprovedAt(LocalDateTime.now());
        }

        return mapToDTO(loanRepository.save(loan));
    }

    @Override
    public List<LoanDTO> getAllLoans() {
        return loanRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private LoanDTO mapToDTO(Loan loan) {
        BigDecimal emi = loan.getEmi();
        BigDecimal totalPayable = null;
        if (emi != null && loan.getTenureMonths() != null) {
            totalPayable = emi.multiply(BigDecimal.valueOf(loan.getTenureMonths())).setScale(2, RoundingMode.HALF_UP);
        }

        return LoanDTO.builder()
                .id(loan.getId())
                .loanType(loan.getLoanType())
                .amount(loan.getAmount())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .status(loan.getStatus())
                .monthlyEmi(emi)
                .totalPayable(totalPayable)
                .remarks(loan.getRemarks())
                .userId(loan.getUser().getId())
                .appliedAt(loan.getAppliedAt())
                .approvedAt(loan.getApprovedAt())
                .build();
    }
}

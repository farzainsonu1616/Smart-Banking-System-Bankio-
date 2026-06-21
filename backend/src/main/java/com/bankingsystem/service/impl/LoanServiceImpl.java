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

import java.time.LocalDateTime;
import java.util.List;
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

        Loan loan = Loan.builder()
                .loanType(loanDTO.getLoanType())
                .amount(loanDTO.getAmount())
                .interestRate(loanDTO.getInterestRate())
                .tenureMonths(loanDTO.getTenureMonths())
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
        return LoanDTO.builder()
                .id(loan.getId())
                .loanType(loan.getLoanType())
                .amount(loan.getAmount())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .status(loan.getStatus())
                .userId(loan.getUser().getId())
                .appliedAt(loan.getAppliedAt())
                .approvedAt(loan.getApprovedAt())
                .build();
    }
}
